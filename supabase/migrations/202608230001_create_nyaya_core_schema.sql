create extension if not exists vector with schema extensions;

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  publisher text not null,
  source_type text not null check (source_type in ('government_portal','law','rule','notification','guideline','pdf','other')),
  url text not null,
  jurisdiction text,
  published_at date,
  last_verified_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active','superseded','archived')),
  created_at timestamptz not null default now()
);
create unique index sources_url_unique on public.sources(url);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.sources(id) on delete cascade,
  title text not null,
  document_type text not null,
  version text,
  content text,
  content_hash text,
  retrieved_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index documents_source_id_idx on public.documents(source_id);

create table public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding extensions.vector(1536),
  created_at timestamptz not null default now(),
  unique(document_id, chunk_index)
);
create index knowledge_chunks_document_id_idx on public.knowledge_chunks(document_id);

create table public.schemes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  short_name text,
  category text not null,
  description text,
  official_url text,
  source_id uuid references public.sources(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.eligibility_rules (
  id uuid primary key default gen_random_uuid(),
  scheme_id uuid not null references public.schemes(id) on delete cascade,
  field_key text not null,
  operator text not null check (operator in ('eq','neq','lt','lte','gt','gte','in','not_in','between','contains','requires_verification')),
  value jsonb not null,
  unit text,
  explanation text,
  source_id uuid references public.sources(id) on delete set null,
  machine_readable boolean not null default true,
  special_handling text,
  created_at timestamptz not null default now()
);
create index eligibility_rules_scheme_id_idx on public.eligibility_rules(scheme_id);
create index eligibility_rules_field_key_idx on public.eligibility_rules(field_key);

create table public.rti_authorities (
  id uuid primary key default gen_random_uuid(),
  department text not null,
  authority_name text not null,
  jurisdiction text,
  address text,
  online_url text,
  source_id uuid references public.sources(id) on delete set null,
  created_at timestamptz not null default now()
);
create index rti_authorities_department_idx on public.rti_authorities(department);

create table public.consumer_rights (
  id uuid primary key default gen_random_uuid(),
  issue_type text not null,
  remedy text not null,
  applicable_law text,
  authority text,
  procedure jsonb not null default '[]'::jsonb,
  source_id uuid references public.sources(id) on delete set null,
  created_at timestamptz not null default now()
);
create index consumer_rights_issue_type_idx on public.consumer_rights(issue_type);

create table public.certificate_services (
  id uuid primary key default gen_random_uuid(),
  certificate_type text not null,
  state text,
  authority text,
  required_documents jsonb not null default '[]'::jsonb,
  application_url text,
  source_id uuid references public.sources(id) on delete set null,
  created_at timestamptz not null default now()
);
create index certificate_services_type_state_idx on public.certificate_services(certificate_type, state);

alter table public.sources enable row level security;
alter table public.documents enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.schemes enable row level security;
alter table public.eligibility_rules enable row level security;
alter table public.rti_authorities enable row level security;
alter table public.consumer_rights enable row level security;
alter table public.certificate_services enable row level security;

create policy "public can read active sources" on public.sources for select using (status = 'active');
create policy "public can read documents" on public.documents for select using (true);
create policy "public can read knowledge chunks" on public.knowledge_chunks for select using (true);
create policy "public can read active schemes" on public.schemes for select using (active = true);
create policy "public can read eligibility rules" on public.eligibility_rules for select using (true);
create policy "public can read rti authorities" on public.rti_authorities for select using (true);
create policy "public can read consumer rights" on public.consumer_rights for select using (true);
create policy "public can read certificate services" on public.certificate_services for select using (true);

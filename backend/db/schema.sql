create table if not exists enquiries (
  id serial primary key,
  full_name text not null,
  phone text not null,
  email text,
  city text,
  plan text not null check (plan in ('FC-60', 'FC-120', 'Not sure')),
  message text,
  created_at timestamptz not null default now()
);

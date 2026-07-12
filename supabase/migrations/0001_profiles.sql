create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'client' check (role in ('client', 'agency', 'admin')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Un utilisateur peut lire sa propre fiche profil.
create policy "profiles_select_own"
  on profiles for select
  using (auth.uid() = id);

-- Un utilisateur peut modifier sa propre fiche profil.
create policy "profiles_update_own"
  on profiles for update
  using (auth.uid() = id);

-- Crée automatiquement une ligne profiles à la création d'un compte Supabase Auth.
create function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

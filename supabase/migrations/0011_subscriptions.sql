create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  brand_id uuid references brands (id) on delete set null,
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  plan text not null check (plan in ('essentiel', 'pro', 'agence')),
  status text not null check (
    status in ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'paused', 'trialing', 'unpaid')
  ),
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

alter table subscriptions enable row level security;

-- Le propriétaire consulte son propre abonnement.
create policy "subscriptions_select_own"
  on subscriptions for select
  using (auth.uid() = profile_id);

-- Aucune policy d'écriture : uniquement écrit par le webhook Stripe via service_role.

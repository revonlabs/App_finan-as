-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Transactions table
create table if not exists public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  date date not null,
  type text not null check (type in ('receita', 'despesa')),
  category text not null,
  subcategory text,
  status text not null default 'pago' check (status in ('pago', 'pendente', 'cancelado')),
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes for performance
create index transactions_user_id_idx on public.transactions (user_id);
create index transactions_date_idx on public.transactions (date);
create index transactions_type_idx on public.transactions (type);

-- Row Level Security
alter table public.transactions enable row level security;

create policy "Users can view their own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_transactions_updated_at
  before update on public.transactions
  for each row execute procedure public.handle_updated_at();

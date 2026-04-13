-- ============================================================
-- AKM Book Reservation System — Initial Schema
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- Books table
create table if not exists public.books (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  author      text not null,
  genre       text,
  description text,
  available   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Reservations table
create table if not exists public.reservations (
  id          uuid primary key default gen_random_uuid(),
  book_id     uuid not null references public.books(id) on delete cascade,
  user_id     uuid references auth.users(id) on delete set null,
  name        text not null,
  email       text not null,
  pickup_date date not null,
  created_at  timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists idx_books_available    on public.books(available);
create index if not exists idx_books_genre        on public.books(genre);
create index if not exists idx_reservations_user  on public.reservations(user_id);
create index if not exists idx_reservations_book  on public.reservations(book_id);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.books        enable row level security;
alter table public.reservations enable row level security;

-- Books: anyone can read
create policy "books_public_read"
  on public.books for select
  using (true);

-- Books: only service role (backend) can insert/update/delete
create policy "books_service_write"
  on public.books for all
  using (auth.role() = 'service_role');

-- Reservations: users can read their own
create policy "reservations_own_read"
  on public.reservations for select
  using (auth.uid() = user_id);

-- Reservations: authenticated users can create
create policy "reservations_authenticated_insert"
  on public.reservations for insert
  with check (true);

-- Reservations: users can delete their own
create policy "reservations_own_delete"
  on public.reservations for delete
  using (auth.uid() = user_id);

-- Reservations: service role can do everything (for backend)
create policy "reservations_service_all"
  on public.reservations for all
  using (auth.role() = 'service_role');

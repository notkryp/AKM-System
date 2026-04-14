-- Sprint 2 Migration: add due_date, status, returned_at to reservations
-- Run via Supabase Dashboard > SQL Editor or `supabase db push`

ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS due_date     DATE,
  ADD COLUMN IF NOT EXISTS status       TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'returned', 'cancelled')),
  ADD COLUMN IF NOT EXISTS returned_at  TIMESTAMPTZ;

-- Backfill existing rows: due_date = pickup_date + 14 days
UPDATE reservations
SET due_date = pickup_date + INTERVAL '14 days'
WHERE due_date IS NULL AND pickup_date IS NOT NULL;

-- Index for admin queries filtering by status
CREATE INDEX IF NOT EXISTS idx_reservations_status
  ON reservations (status);

-- Index for overdue queries
CREATE INDEX IF NOT EXISTS idx_reservations_due_date
  ON reservations (due_date)
  WHERE status = 'active';

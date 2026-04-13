-- ============================================================
-- AKM Book Reservation System — Seed Data
-- Run AFTER 001_initial_schema.sql
-- ============================================================

insert into public.books (title, author, genre, description, available) values
  ('The Great Gatsby',       'F. Scott Fitzgerald', 'Classic',   'A story of wealth, obsession and the American Dream set in the roaring 1920s.',                          true),
  ('1984',                   'George Orwell',       'Dystopian', 'A chilling vision of a totalitarian surveillance state — and one man''s struggle against it.',            true),
  ('To Kill a Mockingbird',  'Harper Lee',          'Classic',   'A powerful exploration of racial injustice and moral growth in the American Deep South.',                  true),
  ('Dune',                   'Frank Herbert',       'Sci-Fi',    'An epic tale of politics, religion, ecology and survival on the desert planet Arrakis.',                   true),
  ('The Alchemist',          'Paulo Coelho',        'Fiction',   'A shepherd boy follows his dream across the desert in this timeless fable about destiny and purpose.',      true),
  ('Brave New World',        'Aldous Huxley',       'Dystopian', 'A dystopian society built on pleasure and conditioning — where happiness is mandatory.',                   true),
  ('The Hitchhiker''s Guide','Douglas Adams',       'Sci-Fi',    'An absurdist comedy following Arthur Dent after Earth is demolished for a hyperspace bypass.',            true),
  ('Pride and Prejudice',    'Jane Austen',         'Classic',   'Elizabeth Bennet navigates love, class and first impressions in Regency-era England.',                    true),
  ('The Road',               'Cormac McCarthy',     'Fiction',   'A father and son journey through a post-apocalyptic wasteland in search of safety and meaning.',           true),
  ('Sapiens',                'Yuval Noah Harari',   'Non-Fiction','A sweeping history of humankind — from the Stone Age to the 21st century.',                            true)
on conflict do nothing;

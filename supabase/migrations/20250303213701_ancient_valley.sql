/*
  # Fix contact_submissions table

  1. New Tables (if not exists)
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `full_name` (text)
      - `email` (text)
      - `company_name` (text)
      - `service_interest` (text)
      - `challenges` (text)
      - `additional_info` (text)
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read their own data
    - Add policy for anyone to insert new submissions
*/

-- Create the table if it doesn't exist with snake_case column names
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  company_name text NOT NULL,
  service_interest text NOT NULL,
  challenges text NOT NULL,
  additional_info text
);

-- Enable row level security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read their own submissions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Users can read own contact submissions'
  ) THEN
    CREATE POLICY "Users can read own contact submissions"
      ON contact_submissions
      FOR SELECT
      TO authenticated
      USING (auth.uid() IN (
        SELECT auth.uid() FROM auth.users WHERE email = contact_submissions.email
      ));
  END IF;
END $$;

-- Allow anyone to insert new submissions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Anyone can insert contact submissions'
  ) THEN
    CREATE POLICY "Anyone can insert contact submissions"
      ON contact_submissions
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;
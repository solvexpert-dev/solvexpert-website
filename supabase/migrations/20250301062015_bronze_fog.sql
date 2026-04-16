/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `fullName` (text, not null)
      - `email` (text, not null)
      - `companyName` (text, not null)
      - `serviceInterest` (text, not null)
      - `challenges` (text, not null)
      - `additionalInfo` (text)
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read their own data
    - Add policy for anon users to insert data
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  fullName text NOT NULL,
  email text NOT NULL,
  companyName text NOT NULL,
  serviceInterest text NOT NULL,
  challenges text NOT NULL,
  additionalInfo text
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read their own submissions
CREATE POLICY "Users can read own contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users WHERE email = contact_submissions.email
  ));

-- Allow anyone to insert new submissions
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
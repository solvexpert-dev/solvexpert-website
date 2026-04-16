/*
  # Fix additionalInfo column check

  1. Changes
    - Modify the column existence check to be case-insensitive
    - Only add the column if it doesn't exist in any case variation
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' 
    AND lower(column_name) = lower('additionalInfo')
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN additionalInfo text;
  END IF;
END $$;
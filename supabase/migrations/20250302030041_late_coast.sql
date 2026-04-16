/*
  # Check for additionalInfo column existence
  
  1. Changes
    - This migration safely checks if the additionalInfo column exists before attempting to add it
    - Uses case-insensitive comparison to handle potential case differences in column names
  
  This migration ensures the additionalInfo column exists in the contact_submissions table
  without causing errors if it already exists.
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
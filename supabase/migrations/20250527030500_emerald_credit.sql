/*
  # Create Google Drive tokens table

  1. New Tables
    - `google_drive_tokens`
      - `user_id` (uuid, primary key, references users.id)
      - `access_token` (text)
      - `refresh_token` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `google_drive_tokens` table
    - Add policy for authenticated users to read their own tokens
*/

CREATE TABLE IF NOT EXISTS google_drive_tokens (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE google_drive_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own tokens"
  ON google_drive_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens"
  ON google_drive_tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tokens"
  ON google_drive_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
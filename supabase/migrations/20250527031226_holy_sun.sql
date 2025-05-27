/*
  # Add Google Forms tokens table

  1. New Tables
    - `google_forms_tokens`
      - `user_id` (uuid, primary key)
      - `access_token` (text)
      - `refresh_token` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `google_forms_tokens` table
    - Add policies for authenticated users to manage their own tokens
*/

CREATE TABLE IF NOT EXISTS google_forms_tokens (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE google_forms_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own forms tokens"
  ON google_forms_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own forms tokens"
  ON google_forms_tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own forms tokens"
  ON google_forms_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
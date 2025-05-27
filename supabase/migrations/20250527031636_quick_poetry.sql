CREATE TABLE IF NOT EXISTS google_docs_tokens (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE google_docs_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own docs tokens"
  ON google_docs_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own docs tokens"
  ON google_docs_tokens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own docs tokens"
  ON google_docs_tokens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
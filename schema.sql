CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  submitted_at TEXT NOT NULL,
  lead_type TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  preferred_contact TEXT,
  message TEXT,
  property TEXT,
  property_address TEXT,
  property_state TEXT,
  areas TEXT,
  price_range TEXT,
  purchase_type TEXT,
  timing TEXT,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON leads(submitted_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

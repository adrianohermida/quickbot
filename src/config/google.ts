interface GoogleConfig {
  enabled: boolean;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
}

export const googleConfig = {
  docs: {
    enabled: import.meta.env.VITE_GOOGLE_DOCS_ENABLED === 'true',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
  drive: {
    enabled: import.meta.env.VITE_GOOGLE_DRIVE_ENABLED === 'true',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
  sheets: {
    enabled: import.meta.env.VITE_GOOGLE_SHEETS_ENABLED === 'true',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
  forms: {
    enabled: import.meta.env.VITE_GOOGLE_FORMS_ENABLED === 'true',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
  calendar: {
    enabled: import.meta.env.VITE_GOOGLE_CALENDAR_ENABLED === 'true',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  },
} as const;
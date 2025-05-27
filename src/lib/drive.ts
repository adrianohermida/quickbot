import { google } from 'googleapis';
import { supabase } from './supabase';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

export class GoogleDriveService {
  private drive;
  private auth;

  constructor(credentials: any) {
    this.auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uri
    );
    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  getAuthUrl() {
    return this.auth.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent',
    });
  }

  async setCredentials(tokens: any) {
    this.auth.setCredentials(tokens);
  }

  async createFolder(name: string) {
    try {
      const fileMetadata = {
        name,
        mimeType: 'application/vnd.google-apps.folder',
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      return response.data.id;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async uploadFile(folderId: string, file: File) {
    try {
      const fileMetadata = {
        name: file.name,
        parents: [folderId],
      };

      const media = {
        mimeType: file.type,
        body: file,
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: 'id, webViewLink',
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

let driveService: GoogleDriveService | null = null;

export function initializeDriveService() {
  if (!driveService) {
    const credentials = {
      client_id: import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_GOOGLE_DRIVE_REDIRECT_URI,
    };
    driveService = new GoogleDriveService(credentials);
  }
  return driveService;
}

export function getDriveService() {
  if (!driveService) {
    throw new Error('Drive service not initialized');
  }
  return driveService;
}

export async function storeGoogleTokens(userId: string, tokens: any) {
  const { error } = await supabase
    .from('google_drive_tokens')
    .upsert({
      user_id: userId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error storing tokens:', error);
    throw error;
  }
}

export async function getStoredTokens(userId: string) {
  const { data, error } = await supabase
    .from('google_drive_tokens')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching tokens:', error);
    return null;
  }

  return data;
}
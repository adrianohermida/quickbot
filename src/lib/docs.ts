import { google } from 'googleapis';
import { supabase } from './supabase';

export interface DocContent {
  title: string;
  content: string;
  folderId?: string;
}

export class GoogleDocsService {
  private docs;
  private drive;
  private auth;

  constructor(credentials: any) {
    this.auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uri
    );
    this.docs = google.docs({ version: 'v1', auth: this.auth });
    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  async setCredentials(tokens: any) {
    this.auth.setCredentials(tokens);
  }

  async createDocument(doc: DocContent) {
    try {
      // Create an empty document first
      const document = await this.docs.documents.create({
        requestBody: {
          title: doc.title,
        },
      });

      if (!document.data.documentId) {
        throw new Error('Failed to create document');
      }

      // Insert the content
      await this.docs.documents.batchUpdate({
        documentId: document.data.documentId,
        requestBody: {
          requests: [
            {
              insertText: {
                location: {
                  index: 1,
                },
                text: doc.content,
              },
            },
          ],
        },
      });

      // Move to specified folder if provided
      if (doc.folderId) {
        await this.drive.files.update({
          fileId: document.data.documentId,
          addParents: doc.folderId,
          fields: 'id, parents',
        });
      }

      return document.data;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  async listFiles(folderId?: string) {
    try {
      const query = folderId ? `'${folderId}' in parents` : undefined;
      
      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name, mimeType, webViewLink, createdTime, modifiedTime)',
        orderBy: 'modifiedTime desc',
      });

      return response.data.files;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async createFolder(name: string, parentId?: string) {
    try {
      const fileMetadata = {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : undefined,
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        fields: 'id, name, webViewLink',
      });

      return response.data;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.drive.files.delete({
        fileId,
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  async renameFile(fileId: string, newName: string) {
    try {
      const response = await this.drive.files.update({
        fileId,
        requestBody: {
          name: newName,
        },
        fields: 'id, name, webViewLink',
      });

      return response.data;
    } catch (error) {
      console.error('Error renaming file:', error);
      throw error;
    }
  }

  async moveFile(fileId: string, newFolderId: string) {
    try {
      // Get current parent folders
      const file = await this.drive.files.get({
        fileId,
        fields: 'parents',
      });

      // Remove from current folders and add to new folder
      const response = await this.drive.files.update({
        fileId,
        removeParents: file.data.parents?.join(','),
        addParents: newFolderId,
        fields: 'id, parents',
      });

      return response.data;
    } catch (error) {
      console.error('Error moving file:', error);
      throw error;
    }
  }
}

let docsService: GoogleDocsService | null = null;

export function initializeDocsService() {
  if (!docsService) {
    const credentials = {
      client_id: import.meta.env.VITE_GOOGLE_DOCS_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_DOCS_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_GOOGLE_DOCS_REDIRECT_URI,
    };
    docsService = new GoogleDocsService(credentials);
  }
  return docsService;
}

export function getDocsService() {
  if (!docsService) {
    throw new Error('Docs service not initialized');
  }
  return docsService;
}

export async function storeDocsTokens(userId: string, tokens: any) {
  const { error } = await supabase
    .from('google_docs_tokens')
    .upsert({
      user_id: userId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error storing docs tokens:', error);
    throw error;
  }
}

export async function getStoredDocsTokens(userId: string) {
  const { data, error } = await supabase
    .from('google_docs_tokens')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching docs tokens:', error);
    return null;
  }

  return data;
}
import { useCallback, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getDocsService, 
  getStoredDocsTokens,
  type DocContent 
} from '../lib/docs';

export function useGoogleDocs() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDocument = useCallback(async (doc: DocContent) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const docsService = getDocsService();
      const tokens = await getStoredDocsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Docs tokens found');
      }

      await docsService.setCredentials(tokens);
      const result = await docsService.createDocument(doc);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const listFiles = useCallback(async (folderId?: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const docsService = getDocsService();
      const tokens = await getStoredDocsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Docs tokens found');
      }

      await docsService.setCredentials(tokens);
      const files = await docsService.listFiles(folderId);
      return files;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createFolder = useCallback(async (name: string, parentId?: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const docsService = getDocsService();
      const tokens = await getStoredDocsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Docs tokens found');
      }

      await docsService.setCredentials(tokens);
      const folder = await docsService.createFolder(name, parentId);
      return folder;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteFile = useCallback(async (fileId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const docsService = getDocsService();
      const tokens = await getStoredDocsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Docs tokens found');
      }

      await docsService.setCredentials(tokens);
      await docsService.deleteFile(fileId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const renameFile = useCallback(async (fileId: string, newName: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const docsService = getDocsService();
      const tokens = await getStoredDocsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Docs tokens found');
      }

      await docsService.setCredentials(tokens);
      const result = await docsService.renameFile(fileId, newName);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const moveFile = useCallback(async (fileId: string, newFolderId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const docsService = getDocsService();
      const tokens = await getStoredDocsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Docs tokens found');
      }

      await docsService.setCredentials(tokens);
      const result = await docsService.moveFile(fileId, newFolderId);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    createDocument,
    listFiles,
    createFolder,
    deleteFile,
    renameFile,
    moveFile,
    loading,
    error,
  };
}
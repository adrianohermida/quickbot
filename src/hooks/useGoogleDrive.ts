import { useCallback, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDriveService, getStoredTokens, storeGoogleTokens } from '../lib/drive';

export function useGoogleDrive() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    if (!user) return;

    try {
      const driveService = getDriveService();
      const authUrl = driveService.getAuthUrl();
      window.location.href = authUrl;
    } catch (err: any) {
      setError(err.message);
    }
  }, [user]);

  const uploadFile = useCallback(async (file: File, folderId?: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const driveService = getDriveService();
      const tokens = await getStoredTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Drive tokens found');
      }

      await driveService.setCredentials(tokens);

      let targetFolderId = folderId;
      if (!targetFolderId) {
        targetFolderId = await driveService.createFolder(`QuickBot_${user.id}`);
      }

      const result = await driveService.uploadFile(targetFolderId, file);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    connect,
    uploadFile,
    loading,
    error,
  };
}
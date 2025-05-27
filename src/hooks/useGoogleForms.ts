import { useCallback, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getFormsService, 
  getStoredFormsTokens,
  type FormResponse 
} from '../lib/forms';

export function useGoogleForms() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getForm = useCallback(async (formId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const formsService = getFormsService();
      const tokens = await getStoredFormsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Forms tokens found');
      }

      await formsService.setCredentials(tokens);
      const form = await formsService.getForm(formId);
      return form;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getResponses = useCallback(async (formId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const formsService = getFormsService();
      const tokens = await getStoredFormsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Forms tokens found');
      }

      await formsService.setCredentials(tokens);
      const responses = await formsService.getResponses(formId);
      return responses;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const syncToSheets = useCallback(async (formId: string, responses: FormResponse[]) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const formsService = getFormsService();
      const tokens = await getStoredFormsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Forms tokens found');
      }

      await formsService.setCredentials(tokens);
      await formsService.syncToSheets(formId, responses);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const watchForm = useCallback(async (formId: string, webhookUrl: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const formsService = getFormsService();
      const tokens = await getStoredFormsTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Forms tokens found');
      }

      await formsService.setCredentials(tokens);
      const watch = await formsService.watchForm(formId, webhookUrl);
      return watch;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    getForm,
    getResponses,
    syncToSheets,
    watchForm,
    loading,
    error,
  };
}
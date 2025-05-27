import { useCallback } from 'react';
import { getSheetsService } from '../lib/sheets';

export function useGoogleSheets(clientId: string) {
  const logLead = useCallback(
    async (user: string, action: string, details: string) => {
      const service = getSheetsService();
      await service.logInteraction(clientId, 'lead', user, action, details);
    },
    [clientId]
  );

  const logSupport = useCallback(
    async (user: string, action: string, details: string) => {
      const service = getSheetsService();
      await service.logInteraction(clientId, 'support', user, action, details);
    },
    [clientId]
  );

  const logAIInteraction = useCallback(
    async (user: string, action: string, details: string) => {
      const service = getSheetsService();
      await service.logInteraction(clientId, 'ai', user, action, details);
    },
    [clientId]
  );

  const getClientHistory = useCallback(async () => {
    const service = getSheetsService();
    return service.getClientLogs(clientId);
  }, [clientId]);

  return {
    logLead,
    logSupport,
    logAIInteraction,
    getClientHistory,
  };
}
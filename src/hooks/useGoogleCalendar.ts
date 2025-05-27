import { useCallback, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getCalendarService, 
  getStoredCalendarTokens, 
  storeCalendarTokens,
  type EventDetails 
} from '../lib/calendar';

export function useGoogleCalendar() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = useCallback(async (calendarId: string, details: EventDetails) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const calendarService = getCalendarService();
      const tokens = await getStoredCalendarTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Calendar tokens found');
      }

      await calendarService.setCredentials(tokens);
      const result = await calendarService.createEvent(calendarId, details);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const listEvents = useCallback(async (calendarId: string, timeMin: Date, timeMax: Date) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const calendarService = getCalendarService();
      const tokens = await getStoredCalendarTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Calendar tokens found');
      }

      await calendarService.setCredentials(tokens);
      const events = await calendarService.listEvents(calendarId, timeMin, timeMax);
      return events;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteEvent = useCallback(async (calendarId: string, eventId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const calendarService = getCalendarService();
      const tokens = await getStoredCalendarTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Calendar tokens found');
      }

      await calendarService.setCredentials(tokens);
      await calendarService.deleteEvent(calendarId, eventId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateEvent = useCallback(async (calendarId: string, eventId: string, details: Partial<EventDetails>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const calendarService = getCalendarService();
      const tokens = await getStoredCalendarTokens(user.id);

      if (!tokens) {
        throw new Error('No Google Calendar tokens found');
      }

      await calendarService.setCredentials(tokens);
      const result = await calendarService.updateEvent(calendarId, eventId, details);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    createEvent,
    listEvents,
    deleteEvent,
    updateEvent,
    loading,
    error,
  };
}
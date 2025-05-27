import { google } from 'googleapis';
import { supabase } from './supabase';
import { addMinutes, parseISO } from 'date-fns';

export interface EventDetails {
  summary: string;
  description?: string;
  startTime: string;
  duration: number;
  attendees: string[];
  meetingType: string;
}

export class GoogleCalendarService {
  private calendar;
  private auth;

  constructor(credentials: any) {
    this.auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uri
    );
    this.calendar = google.calendar({ version: 'v3', auth: this.auth });
  }

  async setCredentials(tokens: any) {
    this.auth.setCredentials(tokens);
  }

  async createEvent(calendarId: string, details: EventDetails) {
    try {
      const startTime = parseISO(details.startTime);
      const endTime = addMinutes(startTime, details.duration);

      const event = {
        summary: details.summary,
        description: details.description,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: details.attendees.map(email => ({ email })),
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(7),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      };

      const response = await this.calendar.events.insert({
        calendarId,
        requestBody: event,
        conferenceDataVersion: 1,
      });

      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async listEvents(calendarId: string, timeMin: Date, timeMax: Date) {
    try {
      const response = await this.calendar.events.list({
        calendarId,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items;
    } catch (error) {
      console.error('Error listing events:', error);
      throw error;
    }
  }

  async deleteEvent(calendarId: string, eventId: string) {
    try {
      await this.calendar.events.delete({
        calendarId,
        eventId,
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  async updateEvent(calendarId: string, eventId: string, details: Partial<EventDetails>) {
    try {
      const event: any = {};

      if (details.summary) event.summary = details.summary;
      if (details.description) event.description = details.description;

      if (details.startTime) {
        const startTime = parseISO(details.startTime);
        const endTime = addMinutes(startTime, details.duration || 30);

        event.start = {
          dateTime: startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        event.end = {
          dateTime: endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
      }

      if (details.attendees) {
        event.attendees = details.attendees.map(email => ({ email }));
      }

      const response = await this.calendar.events.patch({
        calendarId,
        eventId,
        requestBody: event,
      });

      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }
}

let calendarService: GoogleCalendarService | null = null;

export function initializeCalendarService() {
  if (!calendarService) {
    const credentials = {
      client_id: import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_GOOGLE_CALENDAR_REDIRECT_URI,
    };
    calendarService = new GoogleCalendarService(credentials);
  }
  return calendarService;
}

export function getCalendarService() {
  if (!calendarService) {
    throw new Error('Calendar service not initialized');
  }
  return calendarService;
}

export async function storeCalendarTokens(userId: string, tokens: any) {
  const { error } = await supabase
    .from('google_calendar_tokens')
    .upsert({
      user_id: userId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error storing calendar tokens:', error);
    throw error;
  }
}

export async function getStoredCalendarTokens(userId: string) {
  const { data, error } = await supabase
    .from('google_calendar_tokens')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching calendar tokens:', error);
    return null;
  }

  return data;
}
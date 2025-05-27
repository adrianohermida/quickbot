import { google } from 'googleapis';
import { supabase } from './supabase';
import { getSheetsService } from './sheets';

export interface FormResponse {
  formId: string;
  responseId: string;
  timestamp: string;
  answers: {
    questionId: string;
    question: string;
    answer: string;
  }[];
}

export class GoogleFormsService {
  private forms;
  private auth;

  constructor(credentials: any) {
    this.auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uri
    );
    this.forms = google.forms({ version: 'v1', auth: this.auth });
  }

  async setCredentials(tokens: any) {
    this.auth.setCredentials(tokens);
  }

  async getForm(formId: string) {
    try {
      const response = await this.forms.forms.get({
        formId,
      });
      return response.data;
    } catch (error) {
      console.error('Error getting form:', error);
      throw error;
    }
  }

  async getResponses(formId: string) {
    try {
      const response = await this.forms.forms.responses.list({
        formId,
      });
      return response.data;
    } catch (error) {
      console.error('Error getting form responses:', error);
      throw error;
    }
  }

  async watchForm(formId: string, webhookUrl: string) {
    try {
      const response = await this.forms.forms.watches.create({
        formId,
        requestBody: {
          watchTarget: webhookUrl,
          eventType: ['FORM_RESPONSE'],
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error setting up form watch:', error);
      throw error;
    }
  }

  async syncToSheets(formId: string, responses: FormResponse[]) {
    try {
      const sheetsService = getSheetsService();
      const sheetName = `Form_${formId}`;

      for (const response of responses) {
        const row = [
          response.timestamp,
          response.responseId,
          ...response.answers.map(a => a.answer),
        ];

        await sheetsService.logInteraction(
          formId,
          'form',
          response.responseId,
          'submit',
          JSON.stringify(response.answers)
        );
      }
    } catch (error) {
      console.error('Error syncing to sheets:', error);
      throw error;
    }
  }
}

let formsService: GoogleFormsService | null = null;

export function initializeFormsService() {
  if (!formsService) {
    const credentials = {
      client_id: import.meta.env.VITE_GOOGLE_FORMS_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_FORMS_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_GOOGLE_FORMS_REDIRECT_URI,
    };
    formsService = new GoogleFormsService(credentials);
  }
  return formsService;
}

export function getFormsService() {
  if (!formsService) {
    throw new Error('Forms service not initialized');
  }
  return formsService;
}

export async function storeFormsTokens(userId: string, tokens: any) {
  const { error } = await supabase
    .from('google_forms_tokens')
    .upsert({
      user_id: userId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error storing forms tokens:', error);
    throw error;
  }
}

export async function getStoredFormsTokens(userId: string) {
  const { data, error } = await supabase
    .from('google_forms_tokens')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching forms tokens:', error);
    return null;
  }

  return data;
}
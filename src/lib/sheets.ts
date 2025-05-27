import { google } from 'googleapis';
import { format } from 'date-fns';

interface SheetConfig {
  spreadsheetId: string;
  credentials: {
    client_email: string;
    private_key: string;
  };
}

export class GoogleSheetsService {
  private sheets;
  private spreadsheetId: string;

  constructor(config: SheetConfig) {
    const auth = new google.auth.JWT({
      email: config.credentials.client_email,
      key: config.credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = config.spreadsheetId;
  }

  private async ensureSheetExists(sheetName: string) {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      const sheets = response.data.sheets;
      const sheetExists = sheets?.some(
        (sheet) => sheet.properties?.title === sheetName
      );

      if (!sheetExists) {
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: sheetName,
                  },
                },
              },
            ],
          },
        });

        // Add headers to the new sheet
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: `${sheetName}!A1:E1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [['Timestamp', 'Type', 'User', 'Action', 'Details']],
          },
        });
      }
    } catch (error) {
      console.error('Error ensuring sheet exists:', error);
      throw error;
    }
  }

  async logInteraction(
    clientId: string,
    type: 'lead' | 'support' | 'ai',
    user: string,
    action: string,
    details: string
  ) {
    try {
      const sheetName = `Client_${clientId}`;
      await this.ensureSheetExists(sheetName);

      const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const values = [[timestamp, type, user, action, details]];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:E`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values,
        },
      });
    } catch (error) {
      console.error('Error logging interaction:', error);
      throw error;
    }
  }

  async getClientLogs(clientId: string) {
    try {
      const sheetName = `Client_${clientId}`;
      await this.ensureSheetExists(sheetName);

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:E`,
      });

      return response.data.values || [];
    } catch (error) {
      console.error('Error getting client logs:', error);
      throw error;
    }
  }
}

let sheetsService: GoogleSheetsService | null = null;

export function initializeSheetsService() {
  if (!sheetsService) {
    const config: SheetConfig = {
      spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID,
      credentials: {
        client_email: import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    };
    sheetsService = new GoogleSheetsService(config);
  }
  return sheetsService;
}

export function getSheetsService() {
  if (!sheetsService) {
    throw new Error('Sheets service not initialized');
  }
  return sheetsService;
}
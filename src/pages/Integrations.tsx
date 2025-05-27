import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle, AlertCircle, Table, FileSpreadsheet, Key, Database, Calendar, Clock, Settings, Upload, FolderOpen, FileText } from 'lucide-react';
import { useGoogleDrive } from '../hooks/useGoogleDrive';
import { useAuth } from '../contexts/AuthContext';
import { getStoredTokens } from '../lib/drive';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'connected' | 'disconnected';
  category: 'crm' | 'communication' | 'analytics' | 'database' | 'calendar' | 'storage';
}

interface SheetConfig {
  spreadsheetId: string;
  sheetName: string;
  range: string;
  mappings: {
    [key: string]: string;
  };
}

interface CalendarConfig {
  calendarId: string;
  defaultDuration: number;
  workingHours: {
    start: string;
    end: string;
  };
  bufferTime: number;
  meetingTypes: string[];
}

const Integrations: React.FC = () => {
  const { user } = useAuth();
  const { connect, loading, error } = useGoogleDrive();
  const [driveConnected, setDriveConnected] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<SheetConfig>({
    spreadsheetId: '',
    sheetName: '',
    range: '',
    mappings: {}
  });

  const [calendarConfig, setCalendarConfig] = useState<CalendarConfig>({
    calendarId: '',
    defaultDuration: 30,
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    bufferTime: 15,
    meetingTypes: ['Sales Call', 'Product Demo', 'Support Meeting']
  });

  const [showSheetConfig, setShowSheetConfig] = useState(false);
  const [showCalendarConfig, setShowCalendarConfig] = useState(false);

  useEffect(() => {
    const checkDriveConnection = async () => {
      if (user) {
        const tokens = await getStoredTokens(user.id);
        setDriveConnected(!!tokens);
      }
    };
    checkDriveConnection();
  }, [user]);

  const integrations: Integration[] = [
    {
      id: '1',
      name: 'Google Calendar',
      description: 'Calendar service for automated scheduling',
      logo: 'https://images.pexels.com/photos/5726827/pexels-photo-5726827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      status: 'connected',
      category: 'calendar'
    },
    {
      id: '2',
      name: 'Google Drive',
      description: 'Cloud storage for documents and files',
      logo: 'https://images.pexels.com/photos/2882634/pexels-photo-2882634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      status: driveConnected ? 'connected' : 'disconnected',
      category: 'storage'
    }
  ];

  const handleGoogleAuth = () => {
    window.location.href = '/api/auth/google';
  };

  const handleCalendarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalendarConfig({
      ...calendarConfig,
      calendarId: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Integrations</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
          Add New Integration
        </button>
      </div>

      {/* Google Drive Integration */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FolderOpen className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-lg font-medium">Google Drive Integration</h2>
              <p className="text-sm text-gray-500">Configure file storage and management</p>
            </div>
          </div>
          {driveConnected ? (
            <span className="flex items-center text-green-600">
              <CheckCircle size={16} className="mr-1" />
              Connected
            </span>
          ) : (
            <button
              onClick={connect}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Connect Drive'}
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}

        {driveConnected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <Upload size={16} className="text-gray-600 mr-2" />
                <span className="text-sm">Auto-upload files</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <FileText size={16} className="text-gray-600 mr-2" />
                <span className="text-sm">Organize by conversation</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Other Integrations */}
      <h2 className="text-lg font-medium">Available Integrations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map(integration => (
          <div key={integration.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                <img 
                  src={integration.logo} 
                  alt={integration.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{integration.name}</h3>
                <p className="text-xs text-gray-500">{integration.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`flex items-center text-xs ${
                integration.status === 'connected' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {integration.status === 'connected' ? (
                  <>
                    <CheckCircle size={14} className="mr-1" />
                    Connected
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} className="mr-1" />
                    Not connected
                  </>
                )}
              </span>
              
              <button className={`text-xs flex items-center ${
                integration.status === 'connected' ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800'
              }`}>
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                <ExternalLink size={12} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
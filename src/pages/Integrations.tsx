import React, { useState } from 'react';
import { ExternalLink, CheckCircle, AlertCircle, Table, FileSpreadsheet, Key, Database, Calendar, Clock, Settings } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: 'connected' | 'disconnected';
  category: 'crm' | 'communication' | 'analytics' | 'database' | 'calendar' | 'other';
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
      name: 'Google Sheets',
      description: 'Spreadsheet service for data management',
      logo: 'https://images.pexels.com/photos/12906090/pexels-photo-12906090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      status: 'connected',
      category: 'database'
    },
    // ... other integrations
  ];

  const handleGoogleAuth = () => {
    // Implement Google OAuth flow
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

      {/* Google Calendar Configuration */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-lg font-medium">Google Calendar Integration</h2>
              <p className="text-sm text-gray-500">Configure automated meeting scheduling</p>
            </div>
          </div>
          <button
            onClick={() => setShowCalendarConfig(!showCalendarConfig)}
            className="text-blue-600 hover:text-blue-800"
          >
            {showCalendarConfig ? 'Hide Configuration' : 'Show Configuration'}
          </button>
        </div>

        {showCalendarConfig && (
          <div className="space-y-6">
            {/* Authentication Section */}
            <div className="border-b pb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Google Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">Connect your Google account to access calendar</p>
                  <p className="text-xs text-gray-500 mt-1">Required permissions: Google Calendar API access</p>
                </div>
                <button
                  onClick={handleGoogleAuth}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Authenticate with Google
                </button>
              </div>
            </div>

            {/* Calendar Settings */}
            <div className="border-b pb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Calendar Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calendar ID
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="primary or calendar ID"
                    onChange={handleCalendarSelect}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Working Hours Start
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={calendarConfig.workingHours.start}
                      onChange={(e) => setCalendarConfig({
                        ...calendarConfig,
                        workingHours: { ...calendarConfig.workingHours, start: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Working Hours End
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={calendarConfig.workingHours.end}
                      onChange={(e) => setCalendarConfig({
                        ...calendarConfig,
                        workingHours: { ...calendarConfig.workingHours, end: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Meeting Duration (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={calendarConfig.defaultDuration}
                      onChange={(e) => setCalendarConfig({
                        ...calendarConfig,
                        defaultDuration: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Buffer Time (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={calendarConfig.bufferTime}
                      onChange={(e) => setCalendarConfig({
                        ...calendarConfig,
                        bufferTime: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Types */}
            <div className="pb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Meeting Types</h3>
              <div className="space-y-4">
                {calendarConfig.meetingTypes.map((type, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={type}
                      onChange={(e) => {
                        const newTypes = [...calendarConfig.meetingTypes];
                        newTypes[index] = e.target.value;
                        setCalendarConfig({
                          ...calendarConfig,
                          meetingTypes: newTypes
                        });
                      }}
                    />
                    <button
                      onClick={() => {
                        const newTypes = calendarConfig.meetingTypes.filter((_, i) => i !== index);
                        setCalendarConfig({
                          ...calendarConfig,
                          meetingTypes: newTypes
                        });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setCalendarConfig({
                    ...calendarConfig,
                    meetingTypes: [...calendarConfig.meetingTypes, '']
                  })}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Meeting Type
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Test Connection
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Configuration
              </button>
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
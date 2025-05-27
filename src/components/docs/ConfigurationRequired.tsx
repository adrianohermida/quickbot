import React from 'react';
import { Settings } from 'lucide-react';

interface ConfigurationRequiredProps {
  service: string;
}

const ConfigurationRequired: React.FC<ConfigurationRequiredProps> = ({ service }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Settings className="w-6 h-6 text-blue-600" />
      </div>
      <h2 className="text-lg font-medium text-gray-900 mb-2">Configuration Required</h2>
      <p className="text-gray-500 text-center mb-4">
        {service} integration is not configured. Please set up your Google API credentials to enable this feature.
      </p>
      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
        <p className="mb-2">To configure {service}:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Create a Google Cloud project</li>
          <li>Enable the {service} API</li>
          <li>Configure OAuth consent screen</li>
          <li>Create OAuth 2.0 credentials</li>
          <li>Update environment variables</li>
        </ol>
      </div>
    </div>
  );
};

export default ConfigurationRequired;
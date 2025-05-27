import React, { useState } from 'react';
import FileManager from '../components/docs/FileManager';
import DocumentCreator from '../components/docs/DocumentCreator';

const Docs: React.FC = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>();

  const handleFolderChange = (folderId?: string) => {
    setCurrentFolderId(folderId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FileManager
            currentFolderId={currentFolderId}
            onFolderChange={handleFolderChange}
          />
        </div>
        <div>
          <DocumentCreator
            currentFolderId={currentFolderId}
          />
        </div>
      </div>
    </div>
  );
};
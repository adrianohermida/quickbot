import React, { useState, useEffect } from 'react';
import { useGoogleDocs } from '../../hooks/useGoogleDocs';
import { FileText, Folder, Trash2, Edit2, Move, Plus, Upload, Loader } from 'lucide-react';

interface File {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  createdTime: string;
  modifiedTime: string;
}

interface FileManagerProps {
  currentFolderId?: string;
  onFolderChange: (folderId?: string) => void;
}

const FileManager: React.FC<FileManagerProps> = ({ currentFolderId, onFolderChange }) => {
  const { listFiles, createFolder, deleteFile, renameFile, moveFile, loading, error } = useGoogleDocs();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    loadFiles();
  }, [currentFolderId]);

  const loadFiles = async () => {
    try {
      const filesList = await listFiles(currentFolderId);
      setFiles(filesList || []);
    } catch (err) {
      console.error('Error loading files:', err);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName) return;

    try {
      await createFolder(newFolderName, currentFolderId);
      setNewFolderName('');
      setIsCreatingFolder(false);
      loadFiles();
    } catch (err) {
      console.error('Error creating folder:', err);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      await deleteFile(fileId);
      loadFiles();
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  };

  const handleRenameFile = async (fileId: string) => {
    if (!newFileName) return;

    try {
      await renameFile(fileId, newFileName);
      setNewFileName('');
      setIsRenaming(false);
      setSelectedFile(null);
      loadFiles();
    } catch (err) {
      console.error('Error renaming file:', err);
    }
  };

  const handleMoveFile = async (fileId: string, targetFolderId: string) => {
    try {
      await moveFile(fileId, targetFolderId);
      loadFiles();
    } catch (err) {
      console.error('Error moving file:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onFolderChange(undefined)}
            className="text-sm text-blue-600 hover:text-blue-800"
            disabled={!currentFolderId}
          >
            Root
          </button>
          {currentFolderId && (
            <span className="text-gray-500">/</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCreatingFolder(true)}
            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={16} className="mr-1" />
            New Folder
          </button>
          <button className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
            <Upload size={16} className="mr-1" />
            Upload
          </button>
        </div>
      </div>

      {isCreatingFolder && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="flex-1 px-3 py-1 border rounded-md"
            autoFocus
          />
          <button
            onClick={handleCreateFolder}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={() => setIsCreatingFolder(false)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
              selectedFile === file.id ? 'border-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {file.mimeType === 'application/vnd.google-apps.folder' ? (
                  <Folder className="w-8 h-8 text-blue-600" />
                ) : (
                  <FileText className="w-8 h-8 text-green-600" />
                )}
                <div className="ml-3">
                  {isRenaming && selectedFile === file.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="px-2 py-1 border rounded-md text-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => handleRenameFile(file.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 hover:text-blue-600"
                    >
                      {file.name}
                    </a>
                  )}
                  <p className="text-xs text-gray-500">
                    Modified {new Date(file.modifiedTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedFile(file.id);
                    setIsRenaming(true);
                    setNewFileName(file.name);
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
                {file.mimeType === 'application/vnd.google-apps.folder' && (
                  <button
                    onClick={() => onFolderChange(file.id)}
                    className="p-1 text-gray-500 hover:text-blue-600"
                  >
                    <Move size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager
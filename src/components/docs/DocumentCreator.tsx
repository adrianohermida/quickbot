import React, { useState } from 'react';
import { useGoogleDocs } from '../../hooks/useGoogleDocs';
import { FileText, Folder, Loader } from 'lucide-react';

interface DocumentCreatorProps {
  currentFolderId?: string;
  onDocumentCreated?: () => void;
}

const DocumentCreator: React.FC<DocumentCreatorProps> = ({ currentFolderId, onDocumentCreated }) => {
  const { createDocument, loading, error } = useGoogleDocs();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) return;

    try {
      await createDocument({
        title,
        content,
        folderId: currentFolderId,
      });

      setTitle('');
      setContent('');
      onDocumentCreated?.();
    } catch (err) {
      console.error('Error creating document:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <FileText className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-lg font-medium">Create New Document</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateDocument} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Document title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Document content"
            required
          />
        </div>

        {currentFolderId && (
          <div className="flex items-center text-sm text-gray-500">
            <Folder size={16} className="mr-1" />
            Saving to current folder
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader size={16} className="animate-spin mr-2" />
              Creating...
            </>
          ) : (
            'Create Document'
          )}
        </button>
      </form>
    </div>
  );
};
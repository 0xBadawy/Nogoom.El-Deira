import React from 'react';
import { useRouteError } from 'react-router-dom';
// import { AlertCircle } from 'lucide-react';

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          {/* <AlertCircle className="h-12 w-12 text-red-500" /> */}
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <div className="text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
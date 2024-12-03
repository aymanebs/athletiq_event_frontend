import React from 'react';
import { TriangleAlert } from 'lucide-react';


const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <TriangleAlert className="w-12 h-12 text-red-500 mb-4" /> 
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Delete Event</h2>
        </div>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to permanently delete this event? This action cannot be undone.
        </p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-8 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-lg transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

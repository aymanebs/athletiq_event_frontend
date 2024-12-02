import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} AthletiQ Event. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
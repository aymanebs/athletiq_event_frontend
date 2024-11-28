import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router';

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
         <Outlet/> 
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
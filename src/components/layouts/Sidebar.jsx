import React, { useState } from 'react';
import { Menu, X, Home, Settings, Users, Megaphone } from 'lucide-react';
import { Link } from 'react-router';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/home' },
    { icon: Megaphone, label: 'Events', href: '/events' },
    { icon: Users, label: 'Users', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    
  ];

  return (
    <aside className={`bg-gray-800 text-white h-screen flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold uppercase">Athletiq event</h2>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-700 rounded">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
          >
            <item.icon size={20} />
            {isOpen && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
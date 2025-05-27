import React from 'react';
import { Bell, Search, HelpCircle, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-20 z-30 bg-white shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-3 relative flex-1 max-w-xs md:max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <HelpCircle size={20} className="text-gray-700" />
          </button>
          <div className="flex items-center">
            <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
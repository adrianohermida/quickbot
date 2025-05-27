import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, BarChart3, Bot, PlusCircle, Layers } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Agents', path: '/agents', icon: <Bot size={20} /> },
    { name: 'Conversations', path: '/conversations', icon: <MessageSquare size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Integrations', path: '/integrations', icon: <Layers size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
      } transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className={`flex items-center p-4 ${isOpen ? 'justify-between' : 'justify-center'}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          {isOpen && <span className="text-lg font-semibold">QuickBot</span>}
        </div>
        {isOpen && (
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 rounded-full hover:bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-6 flex-1 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-700'
                } ${!isOpen ? 'justify-center' : ''}`
              }
              end={item.path === '/'}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className={`p-4 ${isOpen ? '' : 'flex justify-center'}`}>
        <button className={`flex items-center text-sm p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors w-full ${isOpen ? '' : 'justify-center'}`}>
          <PlusCircle size={isOpen ? 16 : 20} />
          {isOpen && <span className="ml-2">New Agent</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
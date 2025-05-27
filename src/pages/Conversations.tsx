import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';

interface Conversation {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  agent: string;
  channel: 'WhatsApp' | 'Website' | 'Instagram' | 'Email';
  status: 'active' | 'resolved' | 'pending' | 'escalated';
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  duration: string;
}

const Conversations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'pending', label: 'Pending' },
    { id: 'escalated', label: 'Escalated' },
  ];

  const conversations: Conversation[] = [
    {
      id: '1',
      customer: {
        name: 'Carlos Silva',
        email: 'carlos@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      agent: 'Sales Bot',
      channel: 'WhatsApp',
      status: 'active',
      lastMessage: 'Tenho interesse no plano empresarial. Quais são os benefícios?',
      timestamp: '10 min ago',
      unread: true,
      duration: '15 min',
    },
    {
      id: '2',
      customer: {
        name: 'Maria Oliveira',
        email: 'maria@example.com',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      agent: 'Support Bot',
      channel: 'Website',
      status: 'pending',
      lastMessage: 'Não consigo acessar minha conta. Esqueci minha senha.',
      timestamp: '25 min ago',
      unread: false,
      duration: '5 min',
    },
    {
      id: '3',
      customer: {
        name: 'José Santos',
        email: 'jose@example.com',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      agent: 'Finance Bot',
      channel: 'Email',
      status: 'escalated',
      lastMessage: 'Preciso de um comprovante de pagamento para o mês de junho.',
      timestamp: '1 hour ago',
      unread: false,
      duration: '35 min',
    },
    {
      id: '4',
      customer: {
        name: 'Ana Costa',
        email: 'ana@example.com',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      agent: 'Sales Bot',
      channel: 'Instagram',
      status: 'resolved',
      lastMessage: 'Obrigada pelas informações! Vou fazer a compra hoje mesmo.',
      timestamp: '3 hours ago',
      unread: false,
      duration: '20 min',
    },
    {
      id: '5',
      customer: {
        name: 'Roberto Ferreira',
        email: 'roberto@example.com',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      agent: 'Support Bot',
      channel: 'WhatsApp',
      status: 'active',
      lastMessage: 'Como posso atualizar os dados da minha empresa?',
      timestamp: '4 hours ago',
      unread: true,
      duration: '10 min',
    },
  ];

  const filteredConversations = activeTab === 'all' 
    ? conversations 
    : conversations.filter(conv => conv.status === activeTab);

  const statusColors = {
    active: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    escalated: 'bg-red-100 text-red-800',
  };

  const channelIcons = {
    WhatsApp: '📱',
    Website: '🌐',
    Instagram: '📸',
    Email: '✉️',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Conversations</h1>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last month</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search conversations..."
          />
        </div>
        <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50">
          <Filter size={16} className="mr-2" />
          <span>Filters</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Conversations List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredConversations.map((conversation) => (
          <div key={conversation.id} className={`bg-white rounded-lg shadow border-l-4 ${
            conversation.status === 'active' ? 'border-blue-500' :
            conversation.status === 'resolved' ? 'border-green-500' :
            conversation.status === 'pending' ? 'border-amber-500' :
            'border-red-500'
          }`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="relative">
                    <img 
                      src={conversation.customer.avatar} 
                      alt={conversation.customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.unread && (
                      <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{conversation.customer.name}</h3>
                    <p className="text-xs text-gray-500">{conversation.customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[conversation.status]}`}>
                    {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600 line-clamp-2">{conversation.lastMessage}</p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="mr-1">{channelIcons[conversation.channel]}</span>
                    {conversation.channel}
                  </span>
                  <span className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {conversation.timestamp}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare size={12} className="mr-1" />
                    {conversation.agent}
                  </span>
                </div>
                
                <button className="text-blue-600 flex items-center hover:text-blue-800">
                  View Conversation
                  <ArrowRight size={12} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
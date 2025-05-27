import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Filter, Bot, Trash2, Edit, Eye, Copy } from 'lucide-react';

const Agents: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const agentTypes = [
    { id: 'all', label: 'All Agents' },
    { id: 'sales', label: 'Sales' },
    { id: 'support', label: 'Support' },
    { id: 'finance', label: 'Finance' },
    { id: 'knowledge', label: 'Knowledge Base' },
  ];

  const agents = [
    { 
      id: '1', 
      name: 'Sales Assistant', 
      type: 'sales', 
      status: 'active',
      description: 'Handles lead qualification and product inquiries',
      channels: ['WhatsApp', 'Website'],
      performance: 87,
      lastUpdated: '2 days ago'
    },
    { 
      id: '2', 
      name: 'Customer Support', 
      type: 'support', 
      status: 'active',
      description: 'Resolves customer issues and provides technical help',
      channels: ['WhatsApp', 'Instagram', 'Website'],
      performance: 92,
      lastUpdated: '5 hours ago'
    },
    { 
      id: '3', 
      name: 'Payment Collector', 
      type: 'finance', 
      status: 'inactive',
      description: 'Handles invoice reminders and payment processing',
      channels: ['WhatsApp', 'Email'],
      performance: 78,
      lastUpdated: '1 week ago'
    },
    { 
      id: '4', 
      name: 'Product FAQ', 
      type: 'knowledge', 
      status: 'active',
      description: 'Answers common questions about products and services',
      channels: ['Website'],
      performance: 95,
      lastUpdated: '3 days ago'
    },
  ];

  const filteredAgents = activeTab === 'all' 
    ? agents 
    : agents.filter(agent => agent.type === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Agents</h1>
        <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
          <Plus size={16} className="mr-2" />
          Create New Agent
        </button>
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
            placeholder="Search agents..."
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
          {agentTypes.map((type) => (
            <button
              key={type.id}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === type.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(type.id)}
            >
              {type.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Agents List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channels
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        <div className="text-sm text-gray-500">{agent.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {agent.channels.map((channel, idx) => (
                        <span 
                          key={idx} 
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${channel === 'WhatsApp' ? 'bg-green-100 text-green-800' : 
                              channel === 'Website' ? 'bg-blue-100 text-blue-800' : 
                              channel === 'Instagram' ? 'bg-pink-100 text-pink-800' : 
                              'bg-purple-100 text-purple-800'}`}
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            agent.performance >= 90 ? 'bg-green-500' : 
                            agent.performance >= 80 ? 'bg-blue-500' : 
                            agent.performance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${agent.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{agent.performance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agent.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Copy size={16} />
                      </button>
                      <button className="text-red-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agents;
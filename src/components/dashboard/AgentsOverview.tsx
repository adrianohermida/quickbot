import React from 'react';
import { Bot } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  conversations: number;
  resolutionRate: number;
}

const AgentsOverview: React.FC = () => {
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Sales Bot',
      type: 'Lead Generation',
      status: 'online',
      conversations: 1245,
      resolutionRate: 87,
    },
    {
      id: '2',
      name: 'Support Bot',
      type: 'Customer Service',
      status: 'online',
      conversations: 3567,
      resolutionRate: 92,
    },
    {
      id: '3',
      name: 'Finance Bot',
      type: 'Payment Collection',
      status: 'offline',
      conversations: 842,
      resolutionRate: 75,
    },
    {
      id: '4',
      name: 'FAQ Bot',
      type: 'Knowledge Base',
      status: 'maintenance',
      conversations: 2156,
      resolutionRate: 95,
    },
  ];

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    maintenance: 'bg-amber-500',
  };

  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <div key={agent.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <Bot size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{agent.name}</h3>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full ${statusColors[agent.status]} mr-1`}></span>
                <span className="text-xs capitalize">{agent.status}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">{agent.type}</p>
            <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
              <span>{agent.conversations} conversations</span>
              <span>{agent.resolutionRate}% resolution</span>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        Configure Agents
      </button>
    </div>
  );
};

export default AgentsOverview;
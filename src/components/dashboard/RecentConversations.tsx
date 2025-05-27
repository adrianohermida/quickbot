import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

interface Conversation {
  id: string;
  customer: string;
  time: string;
  status: 'resolved' | 'unresolved' | 'pending' | 'escalated';
  agentName: string;
  channel: 'WhatsApp' | 'Website' | 'Instagram';
}

const statusIcons = {
  resolved: <CheckCircle size={16} className="text-green-500" />,
  unresolved: <XCircle size={16} className="text-red-500" />,
  pending: <Clock size={16} className="text-amber-500" />,
  escalated: <AlertTriangle size={16} className="text-purple-500" />,
};

const channelColors = {
  WhatsApp: 'bg-green-100 text-green-800',
  Website: 'bg-blue-100 text-blue-800',
  Instagram: 'bg-pink-100 text-pink-800',
};

const RecentConversations: React.FC = () => {
  const conversations: Conversation[] = [
    {
      id: '1',
      customer: 'Carlos Silva',
      time: '10 min ago',
      status: 'resolved',
      agentName: 'Sales Bot',
      channel: 'WhatsApp',
    },
    {
      id: '2',
      customer: 'Maria Oliveira',
      time: '25 min ago',
      status: 'pending',
      agentName: 'Support Bot',
      channel: 'Website',
    },
    {
      id: '3',
      customer: 'José Santos',
      time: '1 hour ago',
      status: 'escalated',
      agentName: 'Finance Bot',
      channel: 'WhatsApp',
    },
    {
      id: '4',
      customer: 'Ana Costa',
      time: '3 hours ago',
      status: 'resolved',
      agentName: 'Sales Bot',
      channel: 'Instagram',
    },
    {
      id: '5',
      customer: 'Roberto Ferreira',
      time: '5 hours ago',
      status: 'unresolved',
      agentName: 'Support Bot',
      channel: 'Website',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 border-b">
            <th className="pb-2 font-medium">Customer</th>
            <th className="pb-2 font-medium">Time</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Agent</th>
            <th className="pb-2 font-medium">Channel</th>
            <th className="pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {conversations.map((conversation) => (
            <tr key={conversation.id} className="border-b border-gray-100 text-sm hover:bg-gray-50">
              <td className="py-3 font-medium text-gray-900">{conversation.customer}</td>
              <td className="py-3 text-gray-500">{conversation.time}</td>
              <td className="py-3">
                <div className="flex items-center">
                  {statusIcons[conversation.status]}
                  <span className="ml-1 capitalize">{conversation.status}</span>
                </div>
              </td>
              <td className="py-3">{conversation.agentName}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${channelColors[conversation.channel]}`}>
                  {conversation.channel}
                </span>
              </td>
              <td className="py-3 text-right">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentConversations;
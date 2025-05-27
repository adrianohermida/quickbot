import React from 'react';
import { MessageSquare, Bot, Clock, User } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import ConversationChart from '../components/dashboard/ConversationChart';
import RecentConversations from '../components/dashboard/RecentConversations';

const ClientDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last month</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Conversations"
          value="1,234"
          icon={<MessageSquare size={18} />}
          change={+15.8}
          trend="up"
          trendLabel="from last month"
        />
        <MetricCard 
          title="Active Bots"
          value="2"
          icon={<Bot size={18} />}
          change={0}
          trend="up"
          trendLabel="no change"
        />
        <MetricCard 
          title="Avg. Response Time"
          value="1m 24s"
          icon={<Clock size={18} />}
          change={-12.3}
          trend="down"
          trendLabel="faster than last week"
        />
        <MetricCard 
          title="User Satisfaction"
          value="92%"
          icon={<User size={18} />}
          change={+3.7}
          trend="up"
          trendLabel="from last month"
        />
      </div>

      {/* Conversation Analytics */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Conversation Analytics</h2>
          <div className="flex space-x-2">
            <button className="text-sm px-3 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              Daily
            </button>
            <button className="text-sm px-3 py-1 rounded text-gray-500 hover:bg-gray-100 transition-colors">
              Weekly
            </button>
          </div>
        </div>
        <ConversationChart />
      </div>

      {/* Recent Conversations */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Conversations</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            View All
          </button>
        </div>
        <RecentConversations />
      </div>
    </div>
  );
};

export default ClientDashboard;
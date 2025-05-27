import React from 'react';
import { BarChart3, Users, MessageSquare, Bot, ArrowUp, ArrowDown, Zap, Clock, User } from 'lucide-react';
import AgentStatusCard from '../components/dashboard/AgentStatusCard';
import MetricCard from '../components/dashboard/MetricCard';
import ConversationChart from '../components/dashboard/ConversationChart';
import RecentConversations from '../components/dashboard/RecentConversations';
import AgentsOverview from '../components/dashboard/AgentsOverview';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last month</option>
            <option>Custom range</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Agent Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AgentStatusCard 
          title="Total Agents"
          value="8"
          icon={<Bot size={20} className="text-blue-500" />}
          status="active"
          change={+2}
          period="from last month"
        />
        <AgentStatusCard 
          title="Active Users"
          value="2,845"
          icon={<Users size={20} className="text-green-500" />}
          status="active"
          change={+15.8}
          period="from last week"
        />
        <AgentStatusCard 
          title="Conversations"
          value="14,721"
          icon={<MessageSquare size={20} className="text-purple-500" />}
          status="active"
          change={+32.4}
          period="from last month"
        />
        <AgentStatusCard 
          title="Resolution Rate"
          value="78%"
          icon={<Zap size={20} className="text-amber-500" />}
          status="caution"
          change={-3.2}
          period="from last week"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Conversation Analytics</h2>
            <div className="flex space-x-2">
              <button className="text-sm px-3 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                Daily
              </button>
              <button className="text-sm px-3 py-1 rounded text-gray-500 hover:bg-gray-100 transition-colors">
                Weekly
              </button>
              <button className="text-sm px-3 py-1 rounded text-gray-500 hover:bg-gray-100 transition-colors">
                Monthly
              </button>
            </div>
          </div>
          <ConversationChart />
        </div>

        {/* Active Agents Overview */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Active Agents</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              View All
            </button>
          </div>
          <AgentsOverview />
        </div>
      </div>

      {/* Metrics and Recent Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <MetricCard 
            title="Avg. Response Time"
            value="1m 24s"
            icon={<Clock size={18} />}
            change={-12.3}
            trend="down"
            trendLabel="faster than last week"
          />
          <MetricCard 
            title="Satisfaction Rate"
            value="92%"
            icon={<User size={18} />}
            change={+3.7}
            trend="up"
            trendLabel="higher than last week"
          />
          <MetricCard 
            title="Handoff Rate"
            value="18%"
            icon={<ArrowUp size={18} />}
            change={-5.2}
            trend="down"
            trendLabel="less than last month"
          />
          <MetricCard 
            title="Messages / Conversation"
            value="8.4"
            icon={<MessageSquare size={18} />}
            change={+0.6}
            trend="up"
            trendLabel="more than last month"
          />
        </div>

        {/* Recent Conversations */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Conversations</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              View All
            </button>
          </div>
          <RecentConversations />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
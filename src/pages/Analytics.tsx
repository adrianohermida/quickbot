import React, { useState } from 'react';
import { BarChart, Zap, MessageCircle, UserCheck, Clock, Users, Percent } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
        <div className="flex space-x-2">
          <select 
            className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
            <option value="custom">Custom range</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>
      
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Conversations</p>
              <p className="text-2xl font-bold">14,721</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <MessageCircle size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              32.4%
            </span>
            <span className="text-gray-500 ml-1">from previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Resolution Rate</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Zap size={20} className="text-green-600" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-red-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              3.2%
            </span>
            <span className="text-gray-500 ml-1">from previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Avg. Response Time</p>
              <p className="text-2xl font-bold">1m 24s</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Clock size={20} className="text-purple-600" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              12.3%
            </span>
            <span className="text-gray-500 ml-1">faster than previous period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">User Satisfaction</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <UserCheck size={20} className="text-amber-600" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              3.7%
            </span>
            <span className="text-gray-500 ml-1">from previous period</span>
          </div>
        </div>
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Conversation Volume</h2>
            <div className="flex space-x-2">
              <button className="text-sm px-3 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                Daily
              </button>
              <button className="text-sm px-3 py-1 rounded text-gray-500 hover:bg-gray-100 transition-colors">
                Weekly
              </button>
            </div>
          </div>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 text-sm">
                Chart visualization would go here
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 opacity-30 rounded"></div>
            
            {/* Sample chart bars */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between items-end h-48 px-4">
              {[35, 48, 42, 55, 38, 62, 50, 30, 45, 60, 55, 65].map((height, i) => (
                <div key={i} className="w-6 bg-blue-500 opacity-80 rounded-t-sm" style={{height: `${height}%`}}></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Agent Performance</h2>
            <div className="flex space-x-2">
              <select className="text-sm border border-gray-200 rounded px-2 py-1">
                <option>All Agents</option>
                <option>Sales Bot</option>
                <option>Support Bot</option>
                <option>Finance Bot</option>
              </select>
            </div>
          </div>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 text-sm">
                Chart visualization would go here
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-30 rounded"></div>
            
            {/* Sample chart lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path 
                d="M0,150 C50,120 100,170 150,130 C200,90 250,140 300,110 C350,80 400,100 400,80" 
                fill="none" 
                stroke="#8B5CF6" 
                strokeWidth="3"
              />
              <path 
                d="M0,170 C50,150 100,190 150,160 C200,130 250,150 300,140 C350,130 400,110 400,100" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard 
          title="User Engagement"
          value="8.4 msgs/conv"
          icon={<MessageCircle size={18} />}
          change={+0.6}
          trend="up"
          trendLabel="from last month"
        />
        <MetricCard 
          title="First Response Time"
          value="42s"
          icon={<Clock size={18} />}
          change={-8.3}
          trend="down"
          trendLabel="faster than last month"
        />
        <MetricCard 
          title="Human Handoff Rate"
          value="18%"
          icon={<Users size={18} />}
          change={-5.2}
          trend="down"
          trendLabel="from last month"
        />
      </div>
      
      {/* Channel Performance */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Channel Performance</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View Details
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Response</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📱</span>
                    <span className="font-medium">WhatsApp</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">8,432</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                    <span>82%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">1m 12s</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                    <span>94%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">🌐</span>
                    <span className="font-medium">Website</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">4,256</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <span>78%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">1m 35s</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <span>90%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">📸</span>
                    <span className="font-medium">Instagram</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">1,845</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "71%" }}></div>
                    </div>
                    <span>71%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2m 10s</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span>85%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">✉️</span>
                    <span className="font-medium">Email</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">188</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span>65%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">5m 45s</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <span>80%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
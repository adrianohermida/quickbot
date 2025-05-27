import React, { useState } from 'react';
import { User, Shield, Bell, Database, Globe, BellOff } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'api', label: 'API Settings', icon: <Database size={18} /> },
    { id: 'languages', label: 'Languages', icon: <Globe size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="sm:flex">
          {/* Settings Sidebar */}
          <div className="sm:w-64 bg-gray-50 p-4 border-r">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center px-3 py-2 w-full text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="sm:flex-1 p-6">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800">Account Settings</h2>
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value="AetherLab Technologies"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value="admin@aetherlab.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value="Admin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value="User"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Technology</option>
                        <option>E-commerce</option>
                        <option>Healthcare</option>
                        <option>Finance</option>
                        <option>Education</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201-500 employees</option>
                        <option>501+ employees</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                      <textarea
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="123 Business Street, Suite 456, São Paulo, SP, Brazil"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm mr-2">
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800">Security Settings</h2>
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      <p className="text-xs text-gray-500 mt-1">We'll ask for a verification code in addition to your password when you sign in.</p>
                    </div>
                    <div className="ml-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-4">API Access</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Enable API access for integration</p>
                      <p className="text-xs text-gray-500 mt-1">Allow third-party services to connect to your QuickBot account.</p>
                    </div>
                    <div className="ml-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800">Notification Settings</h2>
                
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">Conversation Alerts</p>
                        <p className="text-xs text-gray-500">Receive emails when a new conversation requires attention</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">Performance Reports</p>
                        <p className="text-xs text-gray-500">Weekly summary of your agents' performance</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">System Updates</p>
                        <p className="text-xs text-gray-500">Important updates about QuickBot services</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">In-App Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">Real-time Alerts</p>
                        <p className="text-xs text-gray-500">Immediate notifications for critical events</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">Agent Status Changes</p>
                        <p className="text-xs text-gray-500">Notifications when an agent goes offline or needs attention</p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Notification Schedule</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quiet Hours</label>
                      <div className="flex items-center space-x-3">
                        <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>8:00 PM</option>
                          <option>9:00 PM</option>
                          <option>10:00 PM</option>
                          <option>11:00 PM</option>
                          <option>12:00 AM</option>
                        </select>
                        <span>to</span>
                        <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>6:00 AM</option>
                          <option>7:00 AM</option>
                          <option>8:00 AM</option>
                          <option>9:00 AM</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="weekend-silence" 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="weekend-silence" className="ml-2 text-sm text-gray-700">
                        Silence notifications on weekends
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm mr-2">
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800">API Settings</h2>
                
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">API Keys</h3>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          API keys provide full access to your account. Keep them secure!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">Freshsales API Key</label>
                        <span className="text-xs text-green-600">Active</span>
                      </div>
                      <div className="flex">
                        <input 
                          type="password" 
                          value="●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●" 
                          readOnly
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm"
                        />
                        <button className="bg-gray-100 border border-l-0 border-gray-200 rounded-r-md px-3 text-sm text-gray-600 hover:bg-gray-200">
                          Show
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">Freddy AI API Key</label>
                        <span className="text-xs text-green-600">Active</span>
                      </div>
                      <div className="flex">
                        <input 
                          type="password" 
                          value="●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●" 
                          readOnly
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm"
                        />
                        <button className="bg-gray-100 border border-l-0 border-gray-200 rounded-r-md px-3 text-sm text-gray-600 hover:bg-gray-200">
                          Show
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                        Generate New Key
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Webhook Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/webhook"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter webhook secret key"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Webhook Events</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <input 
                            id="event-conversation" 
                            type="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked
                          />
                          <label htmlFor="event-conversation" className="ml-2 text-sm text-gray-700">
                            New Conversation
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            id="event-message" 
                            type="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked
                          />
                          <label htmlFor="event-message" className="ml-2 text-sm text-gray-700">
                            New Message
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            id="event-status" 
                            type="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked
                          />
                          <label htmlFor="event-status" className="ml-2 text-sm text-gray-700">
                            Status Change
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            id="event-escalation" 
                            type="checkbox" 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked
                          />
                          <label htmlFor="event-escalation" className="ml-2 text-sm text-gray-700">
                            Agent Escalation
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm mr-2">
                    Test Webhook
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'languages' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-800">Language Settings</h2>
                
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Dashboard Language</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interface Language</label>
                    <select className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="en">English (US)</option>
                      <option value="pt-br">Português (Brasil)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>
                
                <div className="border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Agent Languages</h3>
                  <p className="text-sm text-gray-500 mb-4">Configure which languages your AI agents can communicate in.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          id="lang-en" 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked
                        />
                        <label htmlFor="lang-en" className="ml-2 text-sm text-gray-700">
                          English
                        </label>
                      </div>
                      <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Primary</option>
                        <option>Secondary</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          id="lang-pt" 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked
                        />
                        <label htmlFor="lang-pt" className="ml-2 text-sm text-gray-700">
                          Português
                        </label>
                      </div>
                      <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Primary</option>
                        <option selected>Secondary</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          id="lang-es" 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="lang-es" className="ml-2 text-sm text-gray-700">
                          Español
                        </label>
                      </div>
                      <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Primary</option>
                        <option>Secondary</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input 
                          id="lang-fr" 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="lang-fr" className="ml-2 text-sm text-gray-700">
                          Français
                        </label>
                      </div>
                      <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Primary</option>
                        <option>Secondary</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Translation Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input 
                        id="auto-translate" 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked
                      />
                      <label htmlFor="auto-translate" className="ml-2 text-sm text-gray-700">
                        Enable automatic translation for customer messages
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="translate-response" 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked
                      />
                      <label htmlFor="translate-response" className="ml-2 text-sm text-gray-700">
                        Translate agent responses to customer's language
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm mr-2">
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
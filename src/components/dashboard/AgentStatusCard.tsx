import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface AgentStatusCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'caution';
  change: number;
  period: string;
}

const AgentStatusCard: React.FC<AgentStatusCardProps> = ({ 
  title, 
  value, 
  icon, 
  status, 
  change, 
  period 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 border-l-4 transition-transform hover:scale-[1.02] duration-300 ease-in-out" 
      style={{ 
        borderLeftColor: 
          status === 'active' ? '#10B981' : 
          status === 'caution' ? '#F59E0B' : 
          '#EF4444'
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center text-sm">
        {change > 0 ? (
          <ArrowUp size={16} className="text-green-500 mr-1" />
        ) : (
          <ArrowDown size={16} className="text-red-500 mr-1" />
        )}
        <span className={change > 0 ? "text-green-500" : "text-red-500"}>
          {Math.abs(change)}%
        </span>
        <span className="text-gray-500 ml-1">{period}</span>
      </div>
    </div>
  );
};

export default AgentStatusCard;
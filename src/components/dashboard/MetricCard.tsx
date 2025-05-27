import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: number;
  trend: 'up' | 'down';
  trendLabel: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend,
  trendLabel
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-2 text-gray-500 mb-2">
        <span>{icon}</span>
        <span className="text-sm">{title}</span>
      </div>
      <div className="text-xl font-bold mb-2">{value}</div>
      <div className="flex items-center text-xs">
        {trend === 'up' ? (
          <ArrowUp size={14} className={change > 0 ? "text-green-500" : "text-red-500"} />
        ) : (
          <ArrowDown size={14} className={change > 0 ? "text-red-500" : "text-green-500"} />
        )}
        <span 
          className={`ml-1 ${
            (trend === 'up' && change > 0) || (trend === 'down' && change < 0) 
              ? "text-green-500" 
              : "text-red-500"
          }`}
        >
          {Math.abs(change)}%
        </span>
        <span className="ml-1 text-gray-500">{trendLabel}</span>
      </div>
    </div>
  );
};

export default MetricCard;
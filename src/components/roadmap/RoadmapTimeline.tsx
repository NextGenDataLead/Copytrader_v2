import React from 'react';
import { RoadmapItem } from './RoadmapItem';
import { Bell, Bot, Calculator, LineChart, Radio } from 'lucide-react';

export const RoadmapTimeline: React.FC = () => {
  const roadmapItems = [
    {
      icon: <Radio className="w-6 h-6" />,
      title: 'Continuous Listening',
      description: 'Real-time monitoring of successful traders with instant notifications of their trading activities.',
      status: 'upcoming',
      quarter: 'Q2 2025'
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'DEX Aggregator',
      description: 'Integration with multiple DEXs to ensure best execution prices across different liquidity sources.',
      status: 'planned',
      quarter: 'Q2 2025'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Telegram Alerts',
      description: 'Instant notifications via Telegram for trade alerts and portfolio updates.',
      status: 'development',
      quarter: 'Q3 2025'
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'Smart Contract',
      description: 'Automated trading execution through secure smart contracts with customizable parameters.',
      status: 'planned',
      quarter: 'Q3 2025'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Profit & Loss Analytics',
      description: 'Comprehensive P&L tracking with detailed analytics and performance metrics.',
      status: 'planned',
      quarter: 'Q4 2025'
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200 dark:bg-indigo-900" />
      <div className="space-y-16">
        {roadmapItems.map((item, index) => (
          <RoadmapItem
            key={item.title}
            {...item}
            position={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
  );
};
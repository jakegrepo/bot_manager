import React, { useState } from 'react';
import { Bot } from '../types';
import { Activity, Pause, Ban, RefreshCw, Trash2, BarChart } from 'lucide-react';
import StatusToggle from './StatusToggle';
import StatsModal from './StatsModal';

interface BotListProps {
  bots: Bot[];
  onUpdateBot: (bot: Bot) => void;
  onDeleteBot: (id: string) => void;
  onRefreshStats: (username: string) => void;
}

export default function BotList({ bots, onUpdateBot, onDeleteBot, onRefreshStats }: BotListProps) {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="w-5 h-5 text-green-500" />;
      case 'paused':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      case 'banned':
        return <Ban className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  const handleStatusChange = (bot: Bot, newStatus: Bot['status']) => {
    const updatedBot = {
      ...bot,
      status: newStatus,
      banDate: newStatus === 'banned' ? new Date().toISOString() : undefined,
    };
    onUpdateBot(updatedBot);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proxy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bots.map((bot) => (
              <tr key={bot.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusToggle
                    status={bot.status}
                    onStatusChange={(status) => handleStatusChange(bot, status)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bot.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bot.proxy || 'None'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {calculateDuration(bot.startDate, bot.banDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bot.stats?.overall.level || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {bot.stats && (
                    <button
                      onClick={() => setSelectedBot(bot)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <BarChart className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onRefreshStats(bot.username)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteBot(bot.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBot?.stats && (
        <StatsModal
          stats={selectedBot.stats}
          username={selectedBot.username}
          onClose={() => setSelectedBot(null)}
        />
      )}
    </>
  );
}
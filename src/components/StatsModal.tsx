import React from 'react';
import { RunescapeStats } from '../types';
import { X } from 'lucide-react';

interface StatsModalProps {
  stats: RunescapeStats;
  username: string;
  onClose: () => void;
}

const skillIcons: Record<string, string> = {
  overall: '🏆',
  attack: '⚔️',
  defence: '🛡️',
  strength: '💪',
  hitpoints: '❤️',
  ranged: '🏹',
  prayer: '✨',
  magic: '🔮',
  cooking: '🍳',
  woodcutting: '🪓',
  fletching: '🎯',
  fishing: '🎣',
  firemaking: '🔥',
  crafting: '🔨',
  smithing: '⚒️',
  mining: '⛏️',
  herblore: '🧪',
  agility: '🏃',
  thieving: '💰',
  slayer: '👹',
  farming: '🌱',
  runecraft: '🌀',
  hunter: '🦊',
  construction: '🏠'
};

export default function StatsModal({ stats, username, onClose }: StatsModalProps) {
  const formatXP = (xp: number) => {
    return new Intl.NumberFormat().format(xp);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Stats for {username}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(stats).map(([skill, data]) => (
            <div
              key={skill}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{skillIcons[skill]}</span>
                <span className="font-medium capitalize">{skill}</span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  Level: <span className="font-semibold">{data.level}</span>
                </p>
                <p className="text-sm text-gray-600">
                  XP: <span className="font-semibold">{formatXP(data.xp)}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Rank: <span className="font-semibold">#{formatXP(data.rank)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Bot } from '../types';
import { Activity, Pause, Ban } from 'lucide-react';

interface StatusToggleProps {
  status: Bot['status'];
  onStatusChange: (status: Bot['status']) => void;
}

export default function StatusToggle({ status, onStatusChange }: StatusToggleProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onStatusChange('active')}
        className={`p-1 rounded ${
          status === 'active'
            ? 'bg-green-100 text-green-600'
            : 'hover:bg-gray-100 text-gray-400'
        }`}
        title="Set Active"
      >
        <Activity className="w-5 h-5" />
      </button>
      <button
        onClick={() => onStatusChange('paused')}
        className={`p-1 rounded ${
          status === 'paused'
            ? 'bg-yellow-100 text-yellow-600'
            : 'hover:bg-gray-100 text-gray-400'
        }`}
        title="Set Paused"
      >
        <Pause className="w-5 h-5" />
      </button>
      <button
        onClick={() => onStatusChange('banned')}
        className={`p-1 rounded ${
          status === 'banned'
            ? 'bg-red-100 text-red-600'
            : 'hover:bg-gray-100 text-gray-400'
        }`}
        title="Set Banned"
      >
        <Ban className="w-5 h-5" />
      </button>
    </div>
  );
}
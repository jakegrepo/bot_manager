import React, { useState } from 'react';
import { Bot } from '../types';

interface AddBotFormProps {
  onAddBot: (bot: Omit<Bot, 'id' | 'stats' | 'lastUpdated'>) => void;
}

export default function AddBotForm({ onAddBot }: AddBotFormProps) {
  const [username, setUsername] = useState('');
  const [proxy, setProxy] = useState('');
  const [taskType, setTaskType] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    onAddBot({
      username,
      proxy,
      status: 'active',
      startDate: new Date().toISOString(),
      taskType,
      location,
      notes,
      goldPerHour: 0,
      totalGoldEarned: 0,
      lastLoginTime: new Date().toISOString()
    });

    setUsername('');
    setProxy('');
    setTaskType('');
    setLocation('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full"
          placeholder="Enter OSRS username"
          required
        />
      </div>
      
      <div>
        <label htmlFor="proxy" className="block text-sm font-medium text-gray-700">
          Proxy (optional)
        </label>
        <input
          type="text"
          id="proxy"
          value={proxy}
          onChange={(e) => setProxy(e.target.value)}
          className="mt-1 block w-full"
          placeholder="Enter proxy address"
        />
      </div>

      <div>
        <label htmlFor="taskType" className="block text-sm font-medium text-gray-700">
          Task Type
        </label>
        <select
          id="taskType"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="mt-1 block w-full"
        >
          <option value="">Select task type...</option>
          <option value="woodcutting">Woodcutting</option>
          <option value="fishing">Fishing</option>
          <option value="mining">Mining</option>
          <option value="combat">Combat</option>
          <option value="thieving">Thieving</option>
          <option value="crafting">Crafting</option>
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full"
          placeholder="Enter bot location"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full"
          rows={3}
          placeholder="Add any notes about this bot..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Bot
      </button>
    </form>
  );
}
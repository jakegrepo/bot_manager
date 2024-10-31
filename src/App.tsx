import React, { useState, useEffect } from 'react';
import { Bot } from './types';
import { loadBots, saveBots } from './utils/storage';
import { fetchHiscores } from './utils/hiscores';
import BotList from './components/BotList';
import AddBotForm from './components/AddBotForm';
import { Bot as BotIcon } from 'lucide-react';

function App() {
  const [bots, setBots] = useState<Bot[]>([]);

  useEffect(() => {
    setBots(loadBots());
  }, []);

  const handleAddBot = async (newBot: Omit<Bot, 'id' | 'stats' | 'lastUpdated'>) => {
    const stats = await fetchHiscores(newBot.username);
    const bot: Bot = {
      ...newBot,
      id: crypto.randomUUID(),
      stats,
      lastUpdated: new Date().toISOString(),
    };
    
    const updatedBots = [...bots, bot];
    setBots(updatedBots);
    saveBots(updatedBots);
  };

  const handleUpdateBot = (updatedBot: Bot) => {
    const updatedBots = bots.map(bot => 
      bot.id === updatedBot.id ? updatedBot : bot
    );
    setBots(updatedBots);
    saveBots(updatedBots);
  };

  const handleDeleteBot = (id: string) => {
    const updatedBots = bots.filter(bot => bot.id !== id);
    setBots(updatedBots);
    saveBots(updatedBots);
  };

  const handleRefreshStats = async (username: string) => {
    const stats = await fetchHiscores(username);
    if (!stats) return;

    const updatedBots = bots.map(bot => {
      if (bot.username === username) {
        return {
          ...bot,
          stats,
          lastUpdated: new Date().toISOString(),
        };
      }
      return bot;
    });

    setBots(updatedBots);
    saveBots(updatedBots);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <BotIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">OSRS Bot Manager</h1>
            </div>
            <div className="text-sm text-gray-500">
              Total Bots: {bots.length}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <AddBotForm onAddBot={handleAddBot} />
            </div>
            <div className="md:col-span-3">
              <BotList
                bots={bots}
                onUpdateBot={handleUpdateBot}
                onDeleteBot={handleDeleteBot}
                onRefreshStats={handleRefreshStats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
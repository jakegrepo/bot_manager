import { Bot } from '../types';

const STORAGE_KEY = 'osrs-bot-manager';

export const loadBots = (): Bot[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveBots = (bots: Bot[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bots));
};
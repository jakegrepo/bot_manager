import Database from 'better-sqlite3';
import { Bot, RunescapeStats } from '../types';

const db = new Database('bots.db');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS bots (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    proxy TEXT,
    status TEXT,
    startDate TEXT,
    banDate TEXT,
    lastUpdated TEXT,
    notes TEXT,
    taskType TEXT,
    location TEXT,
    goldPerHour INTEGER DEFAULT 0,
    totalGoldEarned INTEGER DEFAULT 0,
    lastLoginTime TEXT
  );

  CREATE TABLE IF NOT EXISTS stats_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    botId TEXT,
    timestamp TEXT,
    statsData TEXT,
    FOREIGN KEY(botId) REFERENCES bots(id)
  );

  CREATE TABLE IF NOT EXISTS bot_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    botId TEXT,
    eventType TEXT,
    description TEXT,
    timestamp TEXT,
    FOREIGN KEY(botId) REFERENCES bots(id)
  );
`);

export const saveBotToDB = (bot: Bot) => {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO bots (
      id, username, proxy, status, startDate, banDate, lastUpdated,
      notes, taskType, location, goldPerHour, totalGoldEarned, lastLoginTime
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    bot.id,
    bot.username,
    bot.proxy,
    bot.status,
    bot.startDate,
    bot.banDate,
    bot.lastUpdated,
    bot.notes,
    bot.taskType,
    bot.location,
    bot.goldPerHour,
    bot.totalGoldEarned,
    bot.lastLoginTime
  );

  if (bot.stats) {
    saveStatsHistory(bot.id, bot.stats);
  }
};

export const loadBotsFromDB = (): Bot[] => {
  const stmt = db.prepare('SELECT * FROM bots');
  const bots = stmt.all() as Bot[];
  
  // Load latest stats for each bot
  return bots.map(bot => {
    const statsStmt = db.prepare(
      'SELECT statsData FROM stats_history WHERE botId = ? ORDER BY timestamp DESC LIMIT 1'
    );
    const statsRow = statsStmt.get(bot.id);
    return {
      ...bot,
      stats: statsRow ? JSON.parse(statsRow.statsData) : undefined
    };
  });
};

export const saveStatsHistory = (botId: string, stats: RunescapeStats) => {
  const stmt = db.prepare(`
    INSERT INTO stats_history (botId, timestamp, statsData)
    VALUES (?, ?, ?)
  `);
  
  stmt.run(botId, new Date().toISOString(), JSON.stringify(stats));
};

export const getStatsHistory = (botId: string) => {
  const stmt = db.prepare('SELECT * FROM stats_history WHERE botId = ? ORDER BY timestamp DESC');
  return stmt.all(botId);
};

export const logBotEvent = (
  botId: string,
  eventType: string,
  description: string
) => {
  const stmt = db.prepare(`
    INSERT INTO bot_events (botId, eventType, description, timestamp)
    VALUES (?, ?, ?, ?)
  `);
  
  stmt.run(botId, eventType, description, new Date().toISOString());
};

export const getBotEvents = (botId: string) => {
  const stmt = db.prepare('SELECT * FROM bot_events WHERE botId = ? ORDER BY timestamp DESC');
  return stmt.all(botId);
};
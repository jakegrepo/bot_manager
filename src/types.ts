export interface Bot {
  id: string;
  username: string;
  proxy: string;
  status: 'active' | 'banned' | 'paused';
  startDate: string;
  banDate?: string;
  stats?: RunescapeStats;
  lastUpdated: string;
  notes?: string;
  taskType?: string;
  location?: string;
  goldPerHour?: number;
  totalGoldEarned?: number;
  lastLoginTime?: string;
}

export interface RunescapeStats {
  overall: SkillStat;
  attack: SkillStat;
  defence: SkillStat;
  strength: SkillStat;
  hitpoints: SkillStat;
  ranged: SkillStat;
  prayer: SkillStat;
  magic: SkillStat;
  cooking: SkillStat;
  woodcutting: SkillStat;
  fletching: SkillStat;
  fishing: SkillStat;
  firemaking: SkillStat;
  crafting: SkillStat;
  smithing: SkillStat;
  mining: SkillStat;
  herblore: SkillStat;
  agility: SkillStat;
  thieving: SkillStat;
  slayer: SkillStat;
  farming: SkillStat;
  runecraft: SkillStat;
  hunter: SkillStat;
  construction: SkillStat;
}

export interface SkillStat {
  rank: number;
  level: number;
  xp: number;
}

export interface BotEvent {
  id: number;
  botId: string;
  eventType: string;
  description: string;
  timestamp: string;
}
import { RunescapeStats, SkillStat } from '../types';

const PROXY_URL = 'https://api.allorigins.win/raw?url=';
const HISCORE_URL = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=';

const parseSkillData = (data: string): SkillStat => {
  const [rank, level, xp] = data.split(',').map(Number);
  return { rank, level, xp };
};

export const fetchHiscores = async (username: string): Promise<RunescapeStats | null> => {
  try {
    const response = await fetch(PROXY_URL + encodeURIComponent(HISCORE_URL + username));
    if (!response.ok) return null;
    
    const data = await response.text();
    const skills = data.split('\n');
    
    return {
      overall: parseSkillData(skills[0]),
      attack: parseSkillData(skills[1]),
      defence: parseSkillData(skills[2]),
      strength: parseSkillData(skills[3]),
      hitpoints: parseSkillData(skills[4]),
      ranged: parseSkillData(skills[5]),
      prayer: parseSkillData(skills[6]),
      magic: parseSkillData(skills[7]),
      cooking: parseSkillData(skills[8]),
      woodcutting: parseSkillData(skills[9]),
      fletching: parseSkillData(skills[10]),
      fishing: parseSkillData(skills[11]),
      firemaking: parseSkillData(skills[12]),
      crafting: parseSkillData(skills[13]),
      smithing: parseSkillData(skills[14]),
      mining: parseSkillData(skills[15]),
      herblore: parseSkillData(skills[16]),
      agility: parseSkillData(skills[17]),
      thieving: parseSkillData(skills[18]),
      slayer: parseSkillData(skills[19]),
      farming: parseSkillData(skills[20]),
      runecraft: parseSkillData(skills[21]),
      hunter: parseSkillData(skills[22]),
      construction: parseSkillData(skills[23])
    };
  } catch (error) {
    console.error('Failed to fetch hiscores:', error);
    return null;
  }
};
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), '.settings.json');

interface Settings {
  registration_enabled: boolean;
  [key: string]: any;
}

function getDefaultSettings(): Settings {
  return {
    registration_enabled: true
  };
}

export function getSettings(): Settings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      return { ...getDefaultSettings(), ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('读取设置文件失败:', error);
  }
  return getDefaultSettings();
}

export function updateSettings(newSettings: Partial<Settings>): Settings {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
    return updatedSettings;
  } catch (error) {
    console.error('保存设置文件失败:', error);
    throw error;
  }
}
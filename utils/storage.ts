import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '@/types/channel';
import { DEFAULT_SETTINGS } from '@/constants/categories';

const STORAGE_KEYS = {
  SETTINGS: '@ingenious_tv:settings',
  WATCH_HISTORY: '@ingenious_tv:watch_history',
  FAVORITES: '@ingenious_tv:favorites',
} as const;

export const storage = {
  // Settings
  async getSettings(): Promise<Settings> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (value) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(value) };
      }
      return DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  async saveSettings(settings: Settings): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  async updateSettings(updates: Partial<Settings>): Promise<Settings> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = { ...currentSettings, ...updates };
      await this.saveSettings(newSettings);
      return newSettings;
    } catch (error) {
      console.error('Error updating settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  // Watch History
  async getWatchHistory(): Promise<string[]> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.WATCH_HISTORY);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error loading watch history:', error);
      return [];
    }
  },

  async addToWatchHistory(channelId: string): Promise<void> {
    try {
      const history = await this.getWatchHistory();
      const updatedHistory = [channelId, ...history.filter(id => id !== channelId)].slice(0, 50);
      await AsyncStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error adding to watch history:', error);
    }
  },

  // Favorites
  async getFavorites(): Promise<string[]> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  },

  async toggleFavorite(channelId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      const isFavorite = favorites.includes(channelId);

      const updatedFavorites = isFavorite
        ? favorites.filter(id => id !== channelId)
        : [...favorites, channelId];

      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
      return !isFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

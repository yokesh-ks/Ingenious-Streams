import { VideoQuality, Theme } from '@/types/channel';

export const CATEGORY_ICONS = {
  news: 'newspaper',
  entertainment: 'tv',
  movies: 'film',
  music: 'music.note',
  sports: 'sportscourt',
  kids: 'figure.2.and.child.holdinghands',
  devotional: 'heart.circle',
  regional: 'globe',
} as const;

export const CATEGORY_COLORS = {
  news: '#EF4444',
  entertainment: '#8B5CF6',
  movies: '#F59E0B',
  music: '#EC4899',
  sports: '#10B981',
  kids: '#3B82F6',
  devotional: '#F97316',
  regional: '#06B6D4',
} as const;

export const DEFAULT_SETTINGS = {
  theme: 'system' as Theme,
  videoQuality: 'auto' as VideoQuality,
  parentalControlsEnabled: false,
};

export const VIDEO_QUALITY_OPTIONS: VideoQuality[] = ['auto', '1080p', '720p', '480p'];

export const THEME_OPTIONS: Theme[] = ['light', 'dark', 'system'];

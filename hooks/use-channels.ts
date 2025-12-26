import { useState, useEffect, useMemo } from 'react';
import { Channel, ChannelData, Category } from '@/types/channel';
import channelData from '@/data/channels.json';

export function useChannels() {
  const [data] = useState<ChannelData>(channelData as ChannelData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all categories
  const categories = useMemo(() => data.categories, [data]);

  // Get all channels
  const allChannels = useMemo(() => data.channels, [data]);

  // Get unique languages with channel counts
  const languages = useMemo(() => {
    const languageMap = new Map<string, number>();
    allChannels.forEach(channel => {
      if (channel.language && channel.isActive) {
        languageMap.set(channel.language, (languageMap.get(channel.language) || 0) + 1);
      }
    });
    return Array.from(languageMap.entries())
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);
  }, [allChannels]);

  // Get featured channels
  const featuredChannels = useMemo(() => {
    return allChannels.filter(channel =>
      data.featured.includes(channel.id) && channel.isActive
    ).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [allChannels, data.featured]);

  // Filter channels by language and category
  const getChannelsByLanguageAndCategory = useMemo(() => {
    let filtered = allChannels.filter(ch => ch.isActive);

    // Filter by language first
    if (selectedLanguage) {
      filtered = filtered.filter(ch => ch.language === selectedLanguage);
    }

    // Then filter by category
    if (selectedCategory) {
      filtered = filtered.filter(ch => ch.categoryId === selectedCategory);
    }

    return filtered;
  }, [allChannels, selectedLanguage, selectedCategory]);

  // Search channels
  const searchChannels = useMemo(() => {
    if (!searchQuery.trim()) {
      return getChannelsByLanguageAndCategory;
    }

    const query = searchQuery.toLowerCase();
    return getChannelsByLanguageAndCategory.filter(
      ch =>
        ch.name.toLowerCase().includes(query) ||
        ch.language?.toLowerCase().includes(query) ||
        ch.categoryId.toLowerCase().includes(query)
    );
  }, [getChannelsByLanguageAndCategory, searchQuery]);

  // Get channel by ID
  const getChannelById = (channelId: string): Channel | undefined => {
    return allChannels.find(ch => ch.id === channelId);
  };

  // Get category by ID
  const getCategoryById = (categoryId: string): Category | undefined => {
    return categories.find(cat => cat.id === categoryId);
  };

  // Get channels for a specific category
  const getChannelsForCategory = (categoryId: string): Channel[] => {
    return allChannels.filter(ch => ch.categoryId === categoryId && ch.isActive);
  };

  return {
    categories,
    languages,
    allChannels,
    featuredChannels,
    filteredChannels: searchChannels,
    selectedCategory,
    setSelectedCategory,
    selectedLanguage,
    setSelectedLanguage,
    searchQuery,
    setSearchQuery,
    getChannelById,
    getCategoryById,
    getChannelsForCategory,
  };
}

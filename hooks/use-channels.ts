import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api } from "@/services/api";
import type { Category, Channel, ChannelData } from "@/types/channel";

export function useChannels() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch language metadata first
	const {
		data: languageMetadata,
		isLoading: isLoadingLanguages,
		error: languageError,
	} = useQuery({
		queryKey: ["languageMetadata"],
		queryFn: api.fetchLanguageMetadata,
		retry: false,
	});

	// Fetch channel data for selected language
	const {
		data: fetchedData,
		isLoading: isLoadingChannels,
		error: channelError,
	} = useQuery<ChannelData>({
		queryKey: ["channelData", selectedLanguage],
		queryFn: () => api.fetchChannelData(selectedLanguage!),
		retry: false,
		enabled: !!selectedLanguage,
	});

	const data: ChannelData = fetchedData || {
		version: "0.0.0",
		lastUpdated: "",
		categories: [],
		channels: [],
		featured: [],
	};

	const isLoading = isLoadingLanguages || isLoadingChannels;
	const error = languageError || channelError;

	// Get all categories
	const categories = useMemo(() => data.categories, [data]);

	// Get all channels
	const allChannels = useMemo(() => data.channels, [data]);

	// Get unique languages with channel counts from metadata
	const languages = useMemo(() => {
		// Handle case where languageMetadata is an array directly
		if (Array.isArray(languageMetadata)) {
			return languageMetadata;
		}
		// Handle case where languageMetadata is an object with a languages property
		if (languageMetadata?.languages) {
			return languageMetadata.languages;
		}
		return [];
	}, [languageMetadata]);

	// Get featured channels
	const featuredChannels = useMemo(() => {
		return allChannels
			.filter(
				(channel) => data.featured.includes(channel.id) && channel.isActive,
			)
			.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
	}, [allChannels, data.featured]);

	// Filter channels by language and category
	const getChannelsByLanguageAndCategory = useMemo(() => {
		let filtered = allChannels.filter((ch) => ch.isActive);

		// Filter by language first
		if (selectedLanguage) {
			filtered = filtered.filter((ch) => ch.language === selectedLanguage);
		}

		// Then filter by category
		if (selectedCategory) {
			filtered = filtered.filter((ch) => ch.categoryId === selectedCategory);
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
			(ch) =>
				ch.name.toLowerCase().includes(query) ||
				ch.language?.toLowerCase().includes(query) ||
				ch.categoryId.toLowerCase().includes(query),
		);
	}, [getChannelsByLanguageAndCategory, searchQuery]);

	// Get channel by ID
	const getChannelById = (channelId: string): Channel | undefined => {
		return allChannels.find((ch) => ch.id === channelId);
	};

	// Get category by ID
	const getCategoryById = (categoryId: string): Category | undefined => {
		return categories.find((cat) => cat.id === categoryId);
	};

	// Get channels for a specific category
	const getChannelsForCategory = (categoryId: string): Channel[] => {
		return allChannels.filter(
			(ch) => ch.categoryId === categoryId && ch.isActive,
		);
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
		isLoading,
		isLoadingLanguages,
		isLoadingChannels,
		error,
		languageMetadata,
	};
}

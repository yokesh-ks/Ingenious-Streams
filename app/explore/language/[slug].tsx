import { ChannelList } from "@/components/channels/channel-list";
import { SearchBar } from "@/components/channels/search-bar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { NetflixColors } from "@/constants/theme";
import { api } from "@/services/api";
import { useLocalSearchParams, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import React from "react";

export default function LanguageDetailScreen() {
	const { slug } = useLocalSearchParams<{ slug: string }>();
	const language = slug ? decodeURIComponent(slug) : "";

	const [searchQuery, setSearchQuery] = React.useState("");

	const { data, isLoading, error } = useQuery({
		queryKey: ["languageData", language],
		queryFn: () => api.fetchChannelData(language),
		enabled: !!language,
	});

	console.log("Language:", language);
	console.log("Data:", data);
	console.log("Is Loading:", isLoading);
	console.log("Error:", error);

	// Handle case where data is an array directly or an object with channels property
	const channels = Array.isArray(data) ? data : data?.channels || [];
	const activeChannels = channels.filter((channel) => channel.isActive);

	console.log("Channels:", channels);
	console.log("Active Channels:", activeChannels);

	// Filter channels based on search query
	const filteredChannels = React.useMemo(() => {
		if (!searchQuery.trim()) {
			return activeChannels;
		}

		const query = searchQuery.toLowerCase();
		return activeChannels.filter(
			(ch) =>
				ch.name.toLowerCase().includes(query) ||
				ch.language?.toLowerCase().includes(query),
		);
	}, [activeChannels, searchQuery]);

	// Show loading state
	if (isLoading) {
		return (
			<>
				<Stack.Screen options={{ title: "Loading..." }} />
				<ThemedView style={styles.container}>
					<View style={styles.contentContainer}>
						<ThemedText style={styles.subtitle}>
							Fetching channel data from GitHub
						</ThemedText>
					</View>
				</ThemedView>
			</>
		);
	}

	// Show error state
	if (error) {
		return (
			<>
				<Stack.Screen options={{ title: "Error" }} />
				<ThemedView style={styles.container}>
					<View style={styles.contentContainer}>
						<ThemedText style={styles.subtitle}>
							{error instanceof Error ? error.message : "Failed to load data"}
						</ThemedText>
					</View>
				</ThemedView>
			</>
		);
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: language.charAt(0).toUpperCase() + language.slice(1),
				}}
			/>
			<ThemedView style={styles.container}>
				<View style={styles.header}>
					<ThemedText style={styles.subtitle}>
						{activeChannels.length} channels available
					</ThemedText>
				</View>

				<SearchBar value={searchQuery} onChangeText={setSearchQuery} />

				<ChannelList
					channels={filteredChannels}
					emptyMessage="No channels found. Try adjusting your search."
					language={language}
				/>
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: NetflixColors.background.primary,
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 12,
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	subtitle: {
		fontSize: 16,
		color: NetflixColors.text.secondary,
	},
});

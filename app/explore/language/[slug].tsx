import { ChannelList } from "@/components/channels/channel-list";
import { SearchBar } from "@/components/channels/search-bar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function LanguageDetailScreen() {
	const { slug } = useLocalSearchParams<{ slug: string }>();
	const language = slug ? decodeURIComponent(slug) : "";

	const [searchQuery, setSearchQuery] = React.useState("");

	const { data, isLoading, error } = useQuery({
		queryKey: ["languageData", language],
		queryFn: () => api.fetchChannelData(language),
		enabled: !!language,
	});

	// Handle case where data is an array directly or an object with channels property
	const channels = Array.isArray(data) ? data : data?.channels || [];

	// Filter channels based on search query
	const filteredChannels = React.useMemo(() => {
		if (!searchQuery.trim()) {
			return channels;
		}

		const query = searchQuery.toLowerCase();
		return channels.filter(
			(ch) =>
				ch.name.toLowerCase().includes(query) ||
				ch.language?.toLowerCase().includes(query),
		);
	}, [channels, searchQuery]);

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
						{channels.length} channels available
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
		opacity: 0.6,
	},
});

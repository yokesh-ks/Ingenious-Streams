import { useLocalSearchParams, router, Stack } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { PlayerError } from "@/components/player/player-error";
import { VideoPlayer } from "@/components/player/video-player";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import type { Channel } from "@/types/channel";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function PlayerScreen() {
	const { language, id } = useLocalSearchParams<{
		language: string;
		id: string;
	}>();

	const channelLanguage = language ? decodeURIComponent(language) : "";
	const channelId = id ? decodeURIComponent(id) : "";

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const {
		data,
		isLoading: isFetching,
		error: fetchError,
	} = useQuery({
		queryKey: ["playerDetails", channelLanguage, channelId],
		queryFn: () => api.fetchPlayerDetails(channelLanguage, channelId),
		enabled: !!channelLanguage && !!channelId,
	});

	const channel = data as Channel;

	useEffect(() => {
		const setOrientation = async () => {
			await ScreenOrientation.unlockAsync();
		};

		setOrientation();

		return () => {
			ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP,
			);
		};
	}, []);

	const handleLoadStart = () => {
		setIsLoading(true);
		setError(null);
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	const handleError = (errorMessage: string) => {
		setIsLoading(false);
		setError(errorMessage || "Failed to load stream");
	};

	const handlePlaybackStatusUpdate = () => {
		// Playback status updated
	};

	const handleRetry = () => {
		setError(null);
		setIsLoading(true);
	};

	// Show loading state while fetching channel data
	if (isFetching) {
		return (
			<ThemedView style={styles.loadingContainer}>
				<ThemedText style={styles.loadingText}>
					Loading channel details...
				</ThemedText>
			</ThemedView>
		);
	}

	// Show error if channel data fetch failed
	if (fetchError) {
		return (
			<View style={styles.container}>
				<PlayerError
					error={
						fetchError instanceof Error
							? fetchError.message
							: "Failed to load channel details"
					}
					onRetry={() => router.back()}
				/>
			</View>
		);
	}

	// Show error if channel not found
	if (!channel) {
		return (
			<View style={styles.container}>
				<PlayerError error="Channel not found" />
			</View>
		);
	}

	// Show error if playback error occurred
	if (error) {
		return (
			<View style={styles.container}>
				<PlayerError error={error} onRetry={handleRetry} />
			</View>
		);
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: channel.name,
					headerShown: true,
					headerStyle: {
						backgroundColor: "#000",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "600",
					},
				}}
			/>
			<View style={styles.container}>
				<StatusBar barStyle="light-content" backgroundColor="#000" />
				<VideoPlayer
					channel={channel}
					onLoadStart={handleLoadStart}
					onLoad={handleLoad}
					onError={handleError}
					onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	loadingContainer: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center",
	},
	loadingText: {
		color: "#fff",
		fontSize: 16,
	},
});

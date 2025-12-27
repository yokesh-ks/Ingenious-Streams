import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { PlayerControls } from "@/components/player/player-controls";
import { PlayerError } from "@/components/player/player-error";
import { VideoPlayer } from "@/components/player/video-player";
import { useChannels } from "@/hooks/use-channels";

export default function PlayerScreen() {
	const { channelId } = useLocalSearchParams<{ channelId: string }>();
	const { getChannelById } = useChannels();
	const isFocused = useIsFocused();

	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const channel = channelId ? getChannelById(channelId) : null;

	useEffect(() => {
		const setOrientation = async () => {
			if (isFocused) {
				await ScreenOrientation.unlockAsync();
			} else {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT_UP,
				);
			}
		};

		setOrientation();

		return () => {
			ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP,
			);
		};
	}, [isFocused]);

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

	const handlePlaybackStatusUpdate = (status: { isPlaying: boolean }) => {
		setIsPlaying(status.isPlaying);
	};

	const handleRetry = () => {
		setError(null);
		setIsLoading(true);
	};

	if (!channel) {
		return (
			<View style={styles.container}>
				<PlayerError error="Channel not found" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.container}>
				<PlayerError error={error} onRetry={handleRetry} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<VideoPlayer
				channel={channel}
				onLoadStart={handleLoadStart}
				onLoad={handleLoad}
				onError={handleError}
				onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
			/>
			{!isLoading && <PlayerControls channel={channel} isPlaying={isPlaying} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
});

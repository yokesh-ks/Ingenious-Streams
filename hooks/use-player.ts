import { useCallback, useState } from "react";
import type { Channel, PlayerState } from "@/types/channel";
import { storage } from "@/utils/storage";

const initialState: PlayerState = {
	currentChannel: null,
	isPlaying: false,
	isLoading: false,
	error: null,
};

export function usePlayer() {
	const [playerState, setPlayerState] = useState<PlayerState>(initialState);

	const playChannel = useCallback(async (channel: Channel) => {
		setPlayerState({
			currentChannel: channel,
			isPlaying: false,
			isLoading: true,
			error: null,
		});

		// Add to watch history
		await storage.addToWatchHistory(channel.id);
	}, []);

	const setPlaying = useCallback((isPlaying: boolean) => {
		setPlayerState((prev) => ({ ...prev, isPlaying, isLoading: false }));
	}, []);

	const setLoading = useCallback((isLoading: boolean) => {
		setPlayerState((prev) => ({ ...prev, isLoading }));
	}, []);

	const setError = useCallback((error: string | null) => {
		setPlayerState((prev) => ({
			...prev,
			error,
			isLoading: false,
			isPlaying: false,
		}));
	}, []);

	const stopPlayback = useCallback(() => {
		setPlayerState(initialState);
	}, []);

	const retryPlayback = useCallback(() => {
		if (playerState.currentChannel) {
			setPlayerState((prev) => ({
				...prev,
				isLoading: true,
				error: null,
			}));
		}
	}, [playerState.currentChannel]);

	return {
		...playerState,
		playChannel,
		setPlaying,
		setLoading,
		setError,
		stopPlayback,
		retryPlayback,
	};
}

import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS } from "@/constants/categories";
import type { Settings, Theme, VideoQuality } from "@/types/channel";
import { storage } from "@/utils/storage";

export function useSettings() {
	const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
	const [isLoading, setIsLoading] = useState(true);

	// Load settings on mount
	useEffect(() => {
		loadSettings();
	}, []);

	const loadSettings = async () => {
		try {
			const loadedSettings = await storage.getSettings();
			setSettings(loadedSettings);
		} catch (error) {
			console.error("Error loading settings:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateTheme = async (theme: Theme) => {
		const newSettings = await storage.updateSettings({ theme });
		setSettings(newSettings);
	};

	const updateVideoQuality = async (quality: VideoQuality) => {
		const newSettings = await storage.updateSettings({ videoQuality: quality });
		setSettings(newSettings);
	};

	const toggleParentalControls = async () => {
		const newSettings = await storage.updateSettings({
			parentalControlsEnabled: !settings.parentalControlsEnabled,
		});
		setSettings(newSettings);
	};

	const setParentalControlsPin = async (pin: string) => {
		const newSettings = await storage.updateSettings({
			parentalControlsPin: pin,
		});
		setSettings(newSettings);
	};

	const resetSettings = async () => {
		await storage.saveSettings(DEFAULT_SETTINGS);
		setSettings(DEFAULT_SETTINGS);
	};

	return {
		settings,
		isLoading,
		updateTheme,
		updateVideoQuality,
		toggleParentalControls,
		setParentalControlsPin,
		resetSettings,
	};
}

import { getGithubDataUrl } from "@/config/env";
import type { ChannelData } from "@/types/channel";

export const api = {
	async fetchLanguageMetadata() {
		const url = getGithubDataUrl("tv/_meta.json");
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch tv metadata: ${response.statusText}`);
		}

		const data = await response.json();
		console.log("Hello", data);

		return data;
	},

	async fetchChannelData(language: string): Promise<ChannelData> {
		const url = getGithubDataUrl(`tv/${language.toLowerCase()}/_meta.json`);
		console.log("Fetching channel data from:", url);
		const response = await fetch(url);

		console.log("Channel data response status:", response.status);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch channel data for ${language}: ${response.statusText}`,
			);
		}

		const data = await response.json();
		console.log("Channel data received:", data);
		return data as ChannelData;
	},

	async fetchPlayerDetails(language: string, channelId: string) {
		const url = getGithubDataUrl(
			`tv/${language.toLowerCase()}/${channelId}.json`,
		);
		console.log("Fetching player details from:", url);
		const response = await fetch(url);

		console.log("Player details response status:", response.status);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch player details for ${channelId}: ${response.statusText}`,
			);
		}

		const data = await response.json();
		console.log("Player details received:", data);
		return data;
	},
};

import { getGithubDataUrl } from "@/config/env";
import type { ChannelData } from "@/types/channel";

export const api = {
	async fetchLanguageMetadata() {
		const url = getGithubDataUrl("tv/language/_meta.json");
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch tv metadata: ${response.statusText}`);
		}
		const data = await response.json();
		return data;
	},

	async fetchChannelData(language: string): Promise<ChannelData> {
		const url = getGithubDataUrl(`tv/language/${language.toLowerCase()}.json`);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch channel data for ${language}: ${response.statusText}`,
			);
		}
		const data = await response.json();
		return data as ChannelData;
	},

	async fetchPlayerDetails(language: string, channelId: string) {
		const url = getGithubDataUrl(`tv/${channelId}.json`);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch player details for ${channelId}: ${response.statusText}`,
			);
		}
		const data = await response.json();
		return data;
	},
};

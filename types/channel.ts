export interface Category {
	id: string;
	name: string;
	icon: string;
	order: number;
}

export interface Channel {
	id: string;
	name: string;
	categoryId: string;
	streamUrl: string;
	quality?: string;
	tvgId?: string;
	logo?: string;
	language?: string;
	isFeatured: boolean;
	isActive: boolean;
	requiresAuth?: boolean;
	geoBlocked?: boolean;
	is24x7?: boolean;
	httpReferrer?: string | null;
	userAgent?: string | null;
	displayOrder?: number;
}

export interface ChannelData {
	version: string;
	lastUpdated: string;
	categories: Category[];
	channels: Channel[];
	featured: string[];
}

export interface PlayerState {
	currentChannel: Channel | null;
	isPlaying: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface Settings {
	theme: "light" | "dark" | "system";
	videoQuality: "auto" | "1080p" | "720p" | "480p";
	parentalControlsEnabled: boolean;
	parentalControlsPin?: string;
}

export type VideoQuality = "auto" | "1080p" | "720p" | "480p";
export type Theme = "light" | "dark" | "system";

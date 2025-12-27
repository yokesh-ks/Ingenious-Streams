/**
 * Netflix-inspired color palette for IngeniousTV
 * Premium dark theme with Netflix red accents
 */

import { Platform } from "react-native";

// Netflix-inspired color palette
export const NetflixColors = {
	background: {
		primary: "#000000", // Pure black
		secondary: "#141414", // Netflix dark gray
		card: "#181818", // Card/elevated surfaces
		cardHover: "#2F2F2F", // Hover state
		overlay: "#000000DD", // Overlay (87% opacity)
	},
	accent: {
		primary: "#E50914", // Netflix red
		hover: "#F40612", // Brighter red on hover
		dark: "#831010", // Dark red
	},
	text: {
		primary: "#FFFFFF", // Pure white
		secondary: "#B3B3B3", // Gray text
		muted: "#808080", // Dimmed text
		disabled: "#595959", // Disabled text
	},
	border: {
		default: "#333333", // Subtle borders
		light: "#404040", // Light borders
		focus: "#E50914", // Focus/accent border
	},
	status: {
		error: "#E50914", // Error (Netflix red)
		warning: "#FFA500", // Warning (Orange)
		success: "#46D369", // Success (Green)
		info: "#5A9FFF", // Info (Blue)
	},
};

// Export unified Colors object (force Netflix theme for both light and dark)
export const Colors = {
	light: {
		text: NetflixColors.text.primary,
		background: NetflixColors.background.primary,
		tint: NetflixColors.accent.primary,
		icon: NetflixColors.text.secondary,
		tabIconDefault: NetflixColors.text.muted,
		tabIconSelected: NetflixColors.accent.primary,
	},
	dark: {
		text: NetflixColors.text.primary,
		background: NetflixColors.background.primary,
		tint: NetflixColors.accent.primary,
		icon: NetflixColors.text.secondary,
		tabIconDefault: NetflixColors.text.muted,
		tabIconSelected: NetflixColors.accent.primary,
	},
};

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: "system-ui",
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: "ui-serif",
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: "ui-rounded",
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});

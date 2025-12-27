/**
 * Ingenious Streams Brand Color Palette
 * Modern, premium, high-contrast, video-first design system
 */

import { Platform } from "react-native";

/**
 * Primary Brand Gradient
 * Use sparingly for hero elements, splash screens, and brand highlights
 */
export const BrandGradient = {
	electricPurple: "#6A1EDC", // Gradient Start
	magentaPink: "#E93CAC", // Mid Accent
	sunsetOrange: "#FF8A1F", // Mid Warm
	oceanBlue: "#00B4D8", // Gradient End
} as const;

/**
 * Core UI Colors
 */
export const CoreColors = {
	// Primary action color - buttons, active tabs, progress indicators
	primaryBlue: "#2563EB",

	// Secondary accent - highlights and secondary actions
	vibrantPink: "#EC4899",
} as const;

/**
 * Neutral System (UI Foundation)
 * Keep the app clean and premium
 */
export const NeutralColors = {
	background: {
		pureWhite: "#FFFFFF", // Background (Light)
		cloudGray: "#F8FAFC", // Background (Soft)
		snow: "#F1F5F9", // Card Background
	},
	border: {
		slateLight: "#E2E8F0", // Divider / Border
	},
} as const;

/**
 * Typography Colors
 */
export const TypographyColors = {
	charcoal: "#0F172A", // Primary Text
	slateGray: "#475569", // Secondary Text
	coolGray: "#94A3B8", // Muted / Disabled
} as const;

/**
 * Status & Utility Colors
 */
export const StatusColors = {
	liveIndicator: "#22C55E", // Neon Green
	error: "#EF4444", // Red
	warning: "#F59E0B", // Amber
	info: "#38BDF8", // Sky Blue
} as const;

/**
 * Dark Mode Colors
 */
export const DarkModeColors = {
	background: "#020617", // Deep Navy
	card: "#0F172A", // Midnight
	primaryText: "#E5E7EB", // Off-White
	secondaryText: "#9CA3AF", // Muted Gray
} as const;

/**
 * Bottom Tab Bar Colors
 */
export const TabBarColors = {
	background: "#FFFFFF",
	activeText: BrandGradient.electricPurple, // Can be gradient in implementation
	inactiveText: "#94A3B8",
	topBorder: "#E2E8F0",
} as const;

/**
 * Unified Colors object for dark mode support
 * Compatible with Expo useColorScheme hook
 */
export const Colors = {
	text: DarkModeColors.primaryText,
	background: DarkModeColors.background,
	tint: CoreColors.primaryBlue,
	icon: DarkModeColors.secondaryText,
	tabIconDefault: DarkModeColors.secondaryText,
	tabIconSelected: CoreColors.primaryBlue,
	card: DarkModeColors.card,
	border: "#1E293B",
	// Status colors
	error: StatusColors.error,
	warning: StatusColors.warning,
	success: StatusColors.liveIndicator,
	info: StatusColors.info,
} as const;

/**
 * Platform-specific font families
 */
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

/**
 * Helper function to create linear gradient configuration
 * For use with expo-linear-gradient or react-native-linear-gradient
 */
export const createBrandGradient = (direction: "horizontal" | "vertical" = "horizontal") => ({
	colors: [
		BrandGradient.electricPurple,
		BrandGradient.magentaPink,
		BrandGradient.sunsetOrange,
		BrandGradient.oceanBlue,
	],
	start: direction === "horizontal" ? { x: 0, y: 0 } : { x: 0, y: 0 },
	end: direction === "horizontal" ? { x: 1, y: 0 } : { x: 0, y: 1 },
});

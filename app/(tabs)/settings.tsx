import Constants from "expo-constants";
import {
	ScrollView,
	StyleSheet,
	Switch,
	TouchableOpacity,
	View,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { THEME_OPTIONS, VIDEO_QUALITY_OPTIONS } from "@/constants/categories";
import { useSettings } from "@/hooks/use-settings";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { Theme, VideoQuality } from "@/types/channel";

export default function SettingsScreen() {
	const { settings, updateTheme, updateVideoQuality, toggleParentalControls } =
		useSettings();
	const tintColor = useThemeColor({}, "tint");
	const borderColor = useThemeColor(
		{ light: "#E5E5E5", dark: "#333" },
		"tabIconDefault",
	);

	const renderThemeOption = (theme: Theme) => {
		const isSelected = settings.theme === theme;
		return (
			<TouchableOpacity
				key={theme}
				style={[
					styles.optionButton,
					{
						borderColor: isSelected ? tintColor : borderColor,
						backgroundColor: isSelected ? `${tintColor}20` : "transparent",
					},
				]}
				onPress={() => updateTheme(theme)}
			>
				<ThemedText
					style={[styles.optionText, isSelected && { color: tintColor }]}
				>
					{theme.charAt(0).toUpperCase() + theme.slice(1)}
				</ThemedText>
			</TouchableOpacity>
		);
	};

	const renderQualityOption = (quality: VideoQuality) => {
		const isSelected = settings.videoQuality === quality;
		return (
			<TouchableOpacity
				key={quality}
				style={[
					styles.optionButton,
					{
						borderColor: isSelected ? tintColor : borderColor,
						backgroundColor: isSelected ? `${tintColor}20` : "transparent",
					},
				]}
				onPress={() => updateVideoQuality(quality)}
			>
				<ThemedText
					style={[styles.optionText, isSelected && { color: tintColor }]}
				>
					{quality.toUpperCase()}
				</ThemedText>
			</TouchableOpacity>
		);
	};

	return (
		<ThemedView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
					<ThemedText type="title" style={styles.title}>
						Settings
					</ThemedText>
					<ThemedText style={styles.subtitle}>
						Customize your viewing experience
					</ThemedText>
				</View>

				<View style={styles.section}>
					<Collapsible title="Appearance">
						<View style={styles.sectionContent}>
							<ThemedText style={styles.sectionDescription}>
								Choose your preferred theme
							</ThemedText>
							<View style={styles.optionsGrid}>
								{THEME_OPTIONS.map(renderThemeOption)}
							</View>
						</View>
					</Collapsible>
				</View>

				<View style={styles.section}>
					<Collapsible title="Video Quality">
						<View style={styles.sectionContent}>
							<ThemedText style={styles.sectionDescription}>
								Set default video quality preference
							</ThemedText>
							<View style={styles.optionsGrid}>
								{VIDEO_QUALITY_OPTIONS.map(renderQualityOption)}
							</View>
						</View>
					</Collapsible>
				</View>

				<View style={styles.section}>
					<Collapsible title="Parental Controls">
						<View style={styles.sectionContent}>
							<ThemedText style={styles.sectionDescription}>
								Restrict access to certain content
							</ThemedText>
							<View style={styles.switchRow}>
								<ThemedText>Enable Parental Controls</ThemedText>
								<Switch
									value={settings.parentalControlsEnabled}
									onValueChange={toggleParentalControls}
									trackColor={{ false: "#767577", true: `${tintColor}80` }}
									thumbColor={
										settings.parentalControlsEnabled ? tintColor : "#f4f3f4"
									}
								/>
							</View>
						</View>
					</Collapsible>
				</View>

				<View style={styles.section}>
					<Collapsible title="About">
						<View style={styles.sectionContent}>
							<View style={styles.infoRow}>
								<ThemedText style={styles.infoLabel}>App Name</ThemedText>
								<ThemedText style={styles.infoValue}>
									IngeniousTV Player
								</ThemedText>
							</View>
							<View style={styles.infoRow}>
								<ThemedText style={styles.infoLabel}>Version</ThemedText>
								<ThemedText style={styles.infoValue}>
									{Constants.expoConfig?.version || "1.0.0"}
								</ThemedText>
							</View>
							<View style={styles.infoRow}>
								<ThemedText style={styles.infoLabel}>Build</ThemedText>
								<ThemedText style={styles.infoValue}>
									{Constants.expoConfig?.android?.versionCode || "1"}
								</ThemedText>
							</View>
							<ThemedText style={[styles.sectionDescription, styles.aboutText]}>
								IngeniousTV Player delivers a clean, curated live-TV experience.
								Fast, simple, and built for viewers who value quality over
								noise.
							</ThemedText>
						</View>
					</Collapsible>
				</View>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},
	header: {
		paddingHorizontal: 16,
		paddingTop: 60,
		paddingBottom: 16,
	},
	title: {
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		opacity: 0.6,
	},
	section: {
		marginBottom: 8,
	},
	sectionContent: {
		paddingTop: 12,
	},
	sectionDescription: {
		fontSize: 14,
		opacity: 0.7,
		marginBottom: 16,
	},
	optionsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	optionButton: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 12,
		borderWidth: 2,
		minWidth: 100,
		alignItems: "center",
	},
	optionText: {
		fontSize: 16,
		fontWeight: "600",
	},
	switchRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
	},
	infoLabel: {
		fontSize: 15,
		opacity: 0.7,
	},
	infoValue: {
		fontSize: 15,
		fontWeight: "600",
	},
	aboutText: {
		marginTop: 12,
		lineHeight: 22,
	},
});

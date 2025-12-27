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
import { NetflixColors } from "@/constants/theme";
import { useSettings } from "@/hooks/use-settings";
import type { Theme, VideoQuality } from "@/types/channel";

export default function SettingsScreen() {
	const { settings, updateTheme, updateVideoQuality, toggleParentalControls } =
		useSettings();

	const renderThemeOption = (theme: Theme) => {
		const isSelected = settings.theme === theme;
		return (
			<TouchableOpacity
				key={theme}
				style={[
					styles.optionButton,
					{
						borderColor: isSelected
							? NetflixColors.accent.primary
							: NetflixColors.border.default,
						backgroundColor: isSelected
							? `${NetflixColors.accent.primary}20`
							: "transparent",
					},
				]}
				onPress={() => updateTheme(theme)}
			>
				<ThemedText
					style={[
						styles.optionText,
						isSelected && { color: NetflixColors.accent.primary },
					]}
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
						borderColor: isSelected
							? NetflixColors.accent.primary
							: NetflixColors.border.default,
						backgroundColor: isSelected
							? `${NetflixColors.accent.primary}20`
							: "transparent",
					},
				]}
				onPress={() => updateVideoQuality(quality)}
			>
				<ThemedText
					style={[
						styles.optionText,
						isSelected && { color: NetflixColors.accent.primary },
					]}
				>
					{quality.toUpperCase()}
				</ThemedText>
			</TouchableOpacity>
		);
	};

	return (
		<ThemedView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
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
									trackColor={{
										false: NetflixColors.text.disabled,
										true: `${NetflixColors.accent.primary}80`,
									}}
									thumbColor={
										settings.parentalControlsEnabled
											? NetflixColors.accent.primary
											: "#f4f3f4"
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
		backgroundColor: NetflixColors.background.secondary,
	},
	scrollContent: {
		paddingTop: 16,
		paddingBottom: 40,
	},
	section: {
		marginBottom: 8,
	},
	sectionContent: {
		paddingTop: 12,
	},
	sectionDescription: {
		fontSize: 14,
		color: NetflixColors.text.secondary,
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
		color: NetflixColors.text.secondary,
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

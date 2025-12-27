import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { NetflixColors } from "@/constants/theme";

interface LanguageCardHorizontalProps {
	language: string;
	channelCount?: number;
	onPress: () => void;
	width?: number;
	height?: number;
}

// Netflix-appropriate language colors for gradients
const LANGUAGE_COLORS: Record<string, string> = {
	Hindi: "#C11119", // Deep red
	English: "#DB202C", // Netflix red variant
	Tamil: "#8B0000", // Dark red
	Telugu: "#B8860B", // Dark golden
	Kannada: "#8B4513", // Saddle brown
	Malayalam: "#2F4F4F", // Dark slate gray
	Bengali: "#483D8B", // Dark slate blue
	Marathi: "#8B008B", // Dark magenta
	Punjabi: "#CD5C5C", // Indian red
	Gujarati: "#556B2F", // Dark olive green
};

export function LanguageCardHorizontal({
	language,
	channelCount,
	onPress,
	width = 300,
	height = 170,
}: LanguageCardHorizontalProps) {
	const cardColor = LANGUAGE_COLORS[language] || NetflixColors.accent.primary;

	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		onPress();
	};

	return (
		<TouchableOpacity
			style={[styles.card, { width, height }]}
			onPress={handlePress}
			activeOpacity={0.8}
		>
			<LinearGradient
				colors={[`${cardColor}99`, "#000000"]}
				style={styles.gradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<ThemedText style={styles.language}>{language}</ThemedText>
				{channelCount !== undefined && (
					<ThemedText style={styles.count}>{channelCount} channels</ThemedText>
				)}
			</LinearGradient>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		marginRight: 16,
		borderRadius: 12,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: NetflixColors.border.default,
	},
	gradient: {
		flex: 1,
		justifyContent: "flex-end",
		padding: 20,
	},
	language: {
		fontSize: 26,
		fontWeight: "900",
		color: NetflixColors.text.primary,
		marginBottom: 4,
	},
	count: {
		fontSize: 14,
		color: NetflixColors.text.secondary,
	},
});

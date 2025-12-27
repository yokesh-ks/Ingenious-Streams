import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { BrandGradient, CoreColors } from "@/constants/theme";

interface LanguageCardHorizontalProps {
	language: string;
	channelCount?: number;
	onPress: () => void;
	width?: number;
	height?: number;
}

// Ingenious Streams brand-appropriate language colors for gradients
const LANGUAGE_COLORS: Record<string, string> = {
	Hindi: BrandGradient.electricPurple, // Electric Purple
	English: CoreColors.primaryBlue, // Primary Blue
	Tamil: BrandGradient.magentaPink, // Magenta Pink
	Telugu: BrandGradient.sunsetOrange, // Sunset Orange
	Kannada: CoreColors.vibrantPink, // Vibrant Pink
	Malayalam: BrandGradient.oceanBlue, // Ocean Blue
	Bengali: BrandGradient.electricPurple, // Electric Purple
	Marathi: BrandGradient.magentaPink, // Magenta Pink
	Punjabi: BrandGradient.sunsetOrange, // Sunset Orange
	Gujarati: CoreColors.primaryBlue, // Primary Blue
};

export function LanguageCardHorizontal({
	language,
	channelCount,
	onPress,
	width = 160,
	height = 90,
}: LanguageCardHorizontalProps) {
	const cardColor = LANGUAGE_COLORS[language] || CoreColors.primaryBlue;

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
		borderColor: "rgba(255, 255, 255, 0.2)",
	},
	gradient: {
		flex: 1,
		justifyContent: "flex-end",
		padding: 10,
	},
	language: {
		fontSize: 16,
		fontWeight: "900",
		color: "#FFFFFF",
		marginBottom: 2,
	},
	count: {
		fontSize: 10,
		color: "rgba(255, 255, 255, 0.8)",
	},
});

import * as Haptics from "expo-haptics";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";

interface LanguageCardProps {
	language: string;
	onPress: () => void;
}

// Netflix-appropriate language colors (darker, more saturated tones)
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

export function LanguageCard({ language, onPress }: LanguageCardProps) {
	const _textColor = useThemeColor({}, "text");
	const borderColor = useThemeColor(
		{ light: "#e5e5e5", dark: "#333" },
		"tabIconDefault",
	);
	const cardColor = LANGUAGE_COLORS[language] || "#666";

	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onPress();
	};

	return (
		<TouchableOpacity
			style={[styles.card, { borderColor, backgroundColor: `${cardColor}10` }]}
			onPress={handlePress}
			activeOpacity={0.7}
		>
			<View
				style={[styles.iconContainer, { backgroundColor: `${cardColor}20` }]}
			>
				<IconSymbol name="globe" size={40} color={cardColor} />
			</View>

			<ThemedText style={styles.language} numberOfLines={1}>
				{language}
			</ThemedText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		margin: 6,
		borderRadius: 20,
		borderWidth: 1,
		minHeight: 160,
	},
	iconContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	language: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 4,
		textAlign: "center",
	},
});

import * as Haptics from "expo-haptics";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";

interface LanguageCardProps {
	language: string;
	channelCount: number;
	onPress: () => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
	Hindi: "#FF6B6B",
	English: "#4ECDC4",
	Tamil: "#45B7D1",
	Telugu: "#FFA07A",
	Kannada: "#98D8C8",
	Malayalam: "#F7DC6F",
	Bengali: "#BB8FCE",
	Marathi: "#85C1E2",
	Punjabi: "#F8B739",
	Gujarati: "#52B788",
};

export function LanguageCard({
	language,
	channelCount,
	onPress,
}: LanguageCardProps) {
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
			<ThemedText style={styles.count}>
				{channelCount} {channelCount === 1 ? "ch" : "channels"}
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
	count: {
		fontSize: 13,
		opacity: 0.6,
		textAlign: "center",
	},
});

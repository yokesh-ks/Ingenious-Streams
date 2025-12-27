import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BrandGradient } from "@/constants/theme";

interface AppHeaderProps {
	title?: string;
	showSettings?: boolean;
	onSettingsPress?: () => void;
}

export function AppHeader({
	title = "IngeniousTV",
	showSettings = true,
	onSettingsPress,
}: AppHeaderProps) {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.header}>
				<ThemedText style={styles.logo}>{title}</ThemedText>
				{showSettings && onSettingsPress && (
					<TouchableOpacity
						onPress={onSettingsPress}
						style={styles.iconButton}
						activeOpacity={0.7}
					>
						<IconSymbol
							name="gearshape.fill"
							size={24}
							color="#FFFFFF"
						/>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: "#000000",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: "#000000",
	},
	logo: {
		fontSize: 28,
		fontWeight: "900",
		color: BrandGradient.electricPurple,
		letterSpacing: -0.5,
	},
	iconButton: {
		padding: 4,
	},
});

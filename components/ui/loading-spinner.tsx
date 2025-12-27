import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

interface LoadingSpinnerProps {
	size?: "small" | "large";
	fullScreen?: boolean;
}

export function LoadingSpinner({
	size = "large",
	fullScreen = false,
}: LoadingSpinnerProps) {
	const tintColor = useThemeColor({}, "tint");

	if (fullScreen) {
		return (
			<ThemedView style={styles.fullScreenContainer}>
				<ActivityIndicator size={size} color={tintColor} />
			</ThemedView>
		);
	}

	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={tintColor} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	fullScreenContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

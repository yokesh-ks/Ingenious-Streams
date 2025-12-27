import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import type { Channel } from "@/types/channel";

interface PlayerControlsProps {
	channel: Channel;
	isPlaying: boolean;
	visible?: boolean;
}

export function PlayerControls({
	channel,
	isPlaying,
	visible = true,
}: PlayerControlsProps) {
	const router = useRouter();
	const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: visible ? 1 : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [visible, fadeAnim]);

	const handleBack = () => {
		router.back();
	};

	return (
		<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
			<View style={styles.topBar}>
				<TouchableOpacity style={styles.backButton} onPress={handleBack}>
					<IconSymbol name="chevron.left" size={24} color="#fff" />
					<ThemedText style={styles.backText}>Back</ThemedText>
				</TouchableOpacity>
			</View>

			<View style={styles.bottomBar}>
				<View style={styles.statusContainer}>
					{isPlaying && (
						<>
							<View style={styles.liveDot} />
							<ThemedText style={styles.liveText}>LIVE</ThemedText>
						</>
					)}
				</View>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		justifyContent: "space-between",
	},
	topBar: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 16,
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
	},
	backText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
		marginLeft: 4,
	},
	bottomBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	statusContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	liveDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#EF4444",
		marginRight: 8,
	},
	liveText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "700",
	},
});

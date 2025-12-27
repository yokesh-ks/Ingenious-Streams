import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import type { Channel } from "@/types/channel";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

interface PlayerControlsProps {
	channel: Channel;
	visible?: boolean;
}

export function PlayerControls({
	channel,
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
				</TouchableOpacity>
				<ThemedText style={styles.channelName}>{channel.name}</ThemedText>
				<View style={styles.placeholder} />
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		justifyContent: "flex-start",
	},
	topBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 16,
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
	},
	channelName: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
		flex: 1,
		textAlign: "center",
	},
	placeholder: {
		width: 40,
	},
	backText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
		marginLeft: 4,
	},
});

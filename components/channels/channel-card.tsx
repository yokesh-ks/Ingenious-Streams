import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { CATEGORY_COLORS } from "@/constants/categories";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { Channel } from "@/types/channel";

interface ChannelCardProps {
	channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
	const router = useRouter();
	const backgroundColor = useThemeColor(
		{ light: "#f5f5f5", dark: "#1a1a1a" },
		"background",
	);
	const textColor = useThemeColor({}, "text");
	const borderColor = useThemeColor(
		{ light: "#e5e5e5", dark: "#333" },
		"tabIconDefault",
	);

	const categoryColor =
		CATEGORY_COLORS[channel.categoryId as keyof typeof CATEGORY_COLORS] ||
		"#666";

	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		router.push({
			pathname: "/player",
			params: { channelId: channel.id },
		});
	};

	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor, borderColor }]}
			onPress={handlePress}
			activeOpacity={0.7}
		>
			<View style={styles.iconContainer}>
				<IconSymbol name="play.tv.fill" size={32} color={categoryColor} />
			</View>

			<View style={styles.content}>
				<View style={styles.header}>
					<ThemedText style={styles.name} numberOfLines={1}>
						{channel.name}
					</ThemedText>
				</View>

				<View style={styles.metadata}>
					{channel.language && (
						<View style={styles.metadataItem}>
							<IconSymbol name="globe" size={12} color={`${textColor}80`} />
							<ThemedText style={styles.metadataText}>
								{channel.language}
							</ThemedText>
						</View>
					)}
					<View
						style={[styles.categoryDot, { backgroundColor: categoryColor }]}
					/>
					<ThemedText style={styles.metadataText}>
						{channel.categoryId}
					</ThemedText>
				</View>
			</View>

			<IconSymbol
				name="chevron.right"
				size={20}
				color={`${textColor}40`}
				style={styles.chevron}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		marginHorizontal: 16,
		marginVertical: 6,
		borderRadius: 12,
		borderWidth: 1,
	},
	iconContainer: {
		width: 56,
		height: 56,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff10",
		marginRight: 12,
	},
	content: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	name: {
		fontSize: 16,
		fontWeight: "600",
		flex: 1,
		marginRight: 8,
	},
	metadata: {
		flexDirection: "row",
		alignItems: "center",
	},
	metadataItem: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 8,
	},
	metadataText: {
		fontSize: 13,
		opacity: 0.6,
		marginLeft: 4,
		textTransform: "capitalize",
	},
	categoryDot: {
		width: 4,
		height: 4,
		borderRadius: 2,
		marginRight: 6,
	},
	chevron: {
		marginLeft: 8,
	},
});

import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { CATEGORY_COLORS } from "@/constants/categories";
import { NetflixColors } from "@/constants/theme";
import type { Channel } from "@/types/channel";

interface ChannelCardProps {
	channel: Channel;
	language?: string;
}

export function ChannelCard({ channel, language }: ChannelCardProps) {
	const router = useRouter();

	const categoryColor =
		CATEGORY_COLORS[channel.categoryId as keyof typeof CATEGORY_COLORS] ||
		NetflixColors.accent.primary;

	const handlePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		const channelLanguage =
			language || channel.language?.toLowerCase() || "unknown";
		router.push(`/explore/language/${channelLanguage}/player?id=${channel.id}`);
	};

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={handlePress}
			activeOpacity={0.7}
		>
			<View style={styles.iconContainer}>
				<IconSymbol
					name="play.tv.fill"
					size={36}
					color={NetflixColors.accent.primary}
				/>
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
							<IconSymbol
								name="globe"
								size={12}
								color={NetflixColors.text.secondary}
							/>
							<ThemedText style={styles.metadataText}>
								{channel.language}
							</ThemedText>
						</View>
					)}
					<View style={styles.categoryDot} />
					<ThemedText style={styles.metadataText}>
						{channel.categoryId}
					</ThemedText>
				</View>
			</View>

			<IconSymbol
				name="chevron.right"
				size={20}
				color={NetflixColors.text.muted}
				style={styles.chevron}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		marginHorizontal: 20,
		marginVertical: 8,
		borderRadius: 12,
		borderWidth: 1,
		backgroundColor: NetflixColors.background.card,
		borderColor: NetflixColors.border.default,
		minHeight: 100,
	},
	iconContainer: {
		width: 64,
		height: 64,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: `${NetflixColors.accent.primary}15`,
		marginRight: 16,
	},
	content: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	name: {
		fontSize: 17,
		fontWeight: "700",
		flex: 1,
		marginRight: 8,
		color: NetflixColors.text.primary,
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
		color: NetflixColors.text.secondary,
		marginLeft: 4,
		textTransform: "capitalize",
	},
	categoryDot: {
		width: 5,
		height: 5,
		borderRadius: 2.5,
		marginRight: 6,
		backgroundColor: NetflixColors.accent.primary,
	},
	chevron: {
		marginLeft: 8,
	},
});

import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { NetflixColors } from "@/constants/theme";
import type { Channel } from "@/types/channel";
import { ChannelCard } from "./channel-card";

interface ChannelListProps {
	channels: Channel[];
	onRefresh?: () => void;
	refreshing?: boolean;
	emptyMessage?: string;
	language?: string;
}

export function ChannelList({
	channels,
	onRefresh,
	refreshing = false,
	emptyMessage = "No channels found",
	language,
}: ChannelListProps) {
	const renderItem = ({ item }: { item: Channel }) => (
		<ChannelCard channel={item} language={language} />
	);

	const renderEmpty = () => (
		<ThemedView style={styles.emptyContainer}>
			<ThemedText style={styles.emptyText}>{emptyMessage}</ThemedText>
		</ThemedView>
	);

	const getItemLayout = (_: any, index: number) => ({
		length: 80,
		offset: 80 * index,
		index,
	});

	return (
		<FlatList
			data={channels}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			contentContainerStyle={styles.contentContainer}
			ListEmptyComponent={renderEmpty}
			getItemLayout={getItemLayout}
			initialNumToRender={10}
			maxToRenderPerBatch={10}
			windowSize={10}
			removeClippedSubviews={true}
			refreshControl={
				onRefresh ? (
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={NetflixColors.accent.primary}
					/>
				) : undefined
			}
		/>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		paddingVertical: 12,
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 80,
	},
	emptyText: {
		fontSize: 16,
		color: NetflixColors.text.secondary,
	},
});

import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Channel } from '@/types/channel';
import { ChannelCard } from './channel-card';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ChannelListProps {
  channels: Channel[];
  onRefresh?: () => void;
  refreshing?: boolean;
  emptyMessage?: string;
}

export function ChannelList({
  channels,
  onRefresh,
  refreshing = false,
  emptyMessage = 'No channels found',
}: ChannelListProps) {
  const tintColor = useThemeColor({}, 'tint');

  const renderItem = ({ item }: { item: Channel }) => (
    <ChannelCard channel={item} />
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
            tintColor={tintColor}
          />
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
});

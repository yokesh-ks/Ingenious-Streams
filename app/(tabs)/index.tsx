import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ChannelList } from '@/components/channels/channel-list';
import { useChannels } from '@/hooks/use-channels';

export default function HomeScreen() {
  const { featuredChannels } = useChannels();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Featured Channels
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Handpicked live TV channels for you
        </ThemedText>
      </View>
      <ChannelList channels={featuredChannels} emptyMessage="No featured channels available" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
});

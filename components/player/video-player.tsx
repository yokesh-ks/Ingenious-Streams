import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { VideoView, useVideoPlayer, VideoSource } from 'expo-video';
import { Channel } from '@/types/channel';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface VideoPlayerProps {
  channel: Channel;
  onLoadStart?: () => void;
  onLoad?: () => void;
  onError?: (error: string) => void;
  onPlaybackStatusUpdate?: (status: { isPlaying: boolean }) => void;
}

export function VideoPlayer({
  channel,
  onLoadStart,
  onLoad,
  onError,
  onPlaybackStatusUpdate,
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const videoSource: VideoSource = {
    uri: channel.streamUrl,
    headers: channel.httpReferrer
      ? { Referer: channel.httpReferrer, 'User-Agent': channel.userAgent || '' }
      : undefined,
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    onLoadStart?.();
    setIsLoading(true);

    const subscription = player.addListener('statusChange', (status) => {
      if (status.status === 'readyToPlay') {
        setIsLoading(false);
        onLoad?.();
        onPlaybackStatusUpdate?.({ isPlaying: player.playing });
      } else if (status.status === 'error') {
        setIsLoading(false);
        onError?.(status.error?.message || 'Failed to load stream');
      }
    });

    const playingSubscription = player.addListener('playingChange', (playingStatus) => {
      onPlaybackStatusUpdate?.({ isPlaying: playingStatus.isPlaying });
    });

    return () => {
      subscription.remove();
      playingSubscription.remove();
    };
  }, [player, channel.streamUrl]);

  useEffect(() => {
    player.replace(videoSource);
  }, [channel.streamUrl]);

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
        contentFit="contain"
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <LoadingSpinner size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

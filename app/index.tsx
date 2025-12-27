import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { LanguageCardHorizontal } from "@/components/channels/language-card-horizontal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CoreColors } from "@/constants/theme";
import { useChannels } from "@/hooks/use-channels";

export default function HomeScreen() {
	const { languages, isLoadingLanguages } = useChannels();
	const router = useRouter();

	const handleLanguagePress = (language: string) => {
		router.push(`/explore/language/${language.toLowerCase()}`);
	};

	return (
		<ThemedView style={styles.container}>
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.section}>
					<ThemedText style={styles.sectionTitle}>Popular Languages</ThemedText>

					{isLoadingLanguages ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator
								size="large"
								color={CoreColors.primaryBlue}
							/>
						</View>
					) : (
						<FlatList
							horizontal
							data={languages}
							renderItem={({ item }) => (
								<LanguageCardHorizontal
									language={item.language || item}
									channelCount={item.channelCount}
									onPress={() => handleLanguagePress(item.language || item)}
								/>
							)}
							keyExtractor={(item) => item.language || item}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.carousel}
							snapToInterval={176} // cardWidth (160) + spacing (16)
							decelerationRate="fast"
						/>
					)}
				</View>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	section: {
		marginTop: 20,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: "900",
		marginBottom: 20,
		paddingHorizontal: 20,
	},
	carousel: {
		paddingHorizontal: 20,
	},
	loadingContainer: {
		paddingVertical: 60,
		alignItems: "center",
		justifyContent: "center",
	},
});

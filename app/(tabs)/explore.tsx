import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ChannelList } from "@/components/channels/channel-list";
import { LanguageCard } from "@/components/channels/language-card";
import { SearchBar } from "@/components/channels/search-bar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useChannels } from "@/hooks/use-channels";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function ExploreScreen() {
	const {
		languages,
		filteredChannels,
		selectedLanguage,
		setSelectedLanguage,
		searchQuery,
		setSearchQuery,
	} = useChannels();

	const textColor = useThemeColor({}, "text");

	const handleLanguageSelect = (language: string) => {
		setSelectedLanguage(language);
	};

	const handleBackToLanguages = () => {
		setSelectedLanguage(null);
		setSearchQuery("");
	};

	// Show language selection screen
	if (!selectedLanguage) {
		return (
			<ThemedView style={styles.container}>
				<View style={styles.header}>
					<ThemedText type="title" style={styles.title}>
						Choose Language
					</ThemedText>
					<ThemedText style={styles.subtitle}>
						Select your preferred language
					</ThemedText>
				</View>

				<FlatList
					data={languages}
					renderItem={({ item }) => (
						<LanguageCard
							language={item.language}
							channelCount={item.count}
							onPress={() => handleLanguageSelect(item.language)}
						/>
					)}
					keyExtractor={(item) => item.language}
					numColumns={2}
					contentContainerStyle={styles.listContent}
					columnWrapperStyle={styles.columnWrapper}
				/>
			</ThemedView>
		);
	}

	// Show channels for selected language
	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerTop}>
					<TouchableOpacity
						onPress={handleBackToLanguages}
						style={styles.backButton}
					>
						<IconSymbol name="chevron.left" size={24} color={textColor} />
						<ThemedText style={styles.backText}>Languages</ThemedText>
					</TouchableOpacity>
				</View>
				<ThemedText type="title" style={styles.title}>
					{selectedLanguage}
				</ThemedText>
				<ThemedText style={styles.subtitle}>
					{filteredChannels.length} channels available
				</ThemedText>
			</View>

			<SearchBar value={searchQuery} onChangeText={setSearchQuery} />

			<ChannelList
				channels={filteredChannels}
				emptyMessage="No channels found. Try adjusting your search."
			/>
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
		paddingBottom: 8,
	},
	headerTop: {
		marginBottom: 12,
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: -8,
	},
	backText: {
		fontSize: 16,
		marginLeft: 4,
	},
	title: {
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		opacity: 0.6,
	},
	listContent: {
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	columnWrapper: {
		justifyContent: "space-between",
	},
});

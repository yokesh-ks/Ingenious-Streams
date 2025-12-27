import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import "react-native-reanimated";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 30, // 30 minutes
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

function SettingsButton() {
	const router = useRouter();
	return (
		<TouchableOpacity
			onPress={() => router.push("/settings")}
			style={{ padding: 8, marginRight: 8 }}
		>
			<IconSymbol name="gearshape.fill" size={24} color="#fff" />
		</TouchableOpacity>
	);
}

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={DarkTheme}>
				<Stack
					screenOptions={{
						headerStyle: {
							backgroundColor: "#000",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "600",
						},
					}}
				>
					<Stack.Screen
						name="index"
						options={{
							headerShown: true,
							title: "Ingenious Streams",
							headerRight: () => <SettingsButton />,
						}}
					/>
					<Stack.Screen name="explore" options={{ headerShown: true }} />
					<Stack.Screen
						name="settings"
						options={{
							presentation: "modal",
							title: "Settings",
							headerShown: true,
						}}
					/>
					<Stack.Screen
						name="modal"
						options={{ presentation: "modal", title: "Modal" }}
					/>
				</Stack>
				<StatusBar style="light" />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

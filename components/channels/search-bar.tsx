import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
}

export function SearchBar({
	value,
	onChangeText,
	placeholder = "Search channels...",
}: SearchBarProps) {
	const [localValue, setLocalValue] = useState(value);
	const backgroundColor = useThemeColor({}, "background");
	const textColor = useThemeColor({}, "text");
	const tintColor = useThemeColor({}, "tint");
	const borderColor = useThemeColor(
		{ light: "#E5E5E5", dark: "#333" },
		"tabIconDefault",
	);

	// Debounce search
	useEffect(() => {
		const timer = setTimeout(() => {
			onChangeText(localValue);
		}, 300);

		return () => clearTimeout(timer);
	}, [localValue, onChangeText]);

	const handleClear = () => {
		setLocalValue("");
		onChangeText("");
	};

	return (
		<View style={[styles.container, { backgroundColor, borderColor }]}>
			<IconSymbol
				name="magnifyingglass"
				size={20}
				color={tintColor}
				style={styles.icon}
			/>
			<TextInput
				style={[styles.input, { color: textColor }]}
				value={localValue}
				onChangeText={setLocalValue}
				placeholder={placeholder}
				placeholderTextColor={`${textColor}80`}
				autoCapitalize="none"
				autoCorrect={false}
				returnKeyType="search"
			/>
			{localValue.length > 0 && (
				<TouchableOpacity onPress={handleClear} style={styles.clearButton}>
					<IconSymbol
						name="xmark.circle.fill"
						size={20}
						color={`${textColor}80`}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 12,
		borderWidth: 1,
		marginHorizontal: 16,
		marginVertical: 12,
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 4,
	},
	clearButton: {
		padding: 4,
	},
});

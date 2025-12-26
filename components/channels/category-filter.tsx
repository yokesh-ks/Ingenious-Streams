import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Category } from '@/types/channel';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <TouchableOpacity
        style={[
          styles.chip,
          {
            backgroundColor: selectedCategory === null ? tintColor : 'transparent',
            borderColor: tintColor,
          },
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text
          style={[
            styles.chipText,
            { color: selectedCategory === null ? '#fff' : textColor },
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? tintColor : 'transparent',
                borderColor: tintColor,
              },
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <IconSymbol
              name={category.icon as any}
              size={16}
              color={isSelected ? '#fff' : textColor}
              style={styles.chipIcon}
            />
            <Text
              style={[
                styles.chipText,
                { color: isSelected ? '#fff' : textColor },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 50,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

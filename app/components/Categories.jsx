import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useMemo } from "react";

const Categories = ({ categoriesNames, onCategorySelect }) => {
  // Function to remove duplicate categories
  const getUniqueCategories = (categories) => {
    const uniqueCategories = [];
    const categorySet = new Set();

    categories.forEach((item) => {
      if (!categorySet.has(item.category)) {
        uniqueCategories.push(item);
        categorySet.add(item.category);
      }
    });

    return uniqueCategories;
  };

  // Use useMemo to memoize the unique categories list
  const uniqueCategories = useMemo(() => getUniqueCategories(categoriesNames), [categoriesNames]);

  return (
    <View>
      <FlatList
        data={[{ id: 'all', category: 'All' }, ...uniqueCategories]}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => onCategorySelect(item.category)}
          >
            <Text style={styles.categoryText}>{item.category}</Text>
          </TouchableOpacity>
        )}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 2,
    paddingBottom: 4,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    marginHorizontal: 4,
  },
  categoryText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Categories;

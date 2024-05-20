import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const Categories = () => {
  const categories = [
    { id: "1", name: "fruits" },
    { id: "2", name: "flour" },
    { id: "3", name: "Food Name" },
    { id: "4", name: "Food Name" },
    { id: "5", name: "Food Name" },
    { id: "6", name: "Food Name" },

  ];
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity className="p-2 border rounded-lg border-black hover:bg-gray-200  mx-2  ">
          <Text className="text-gray-500 font-bold text-lg ">{item.name}</Text>
        </TouchableOpacity>
      )}
      className="mb-2 pb-4"
    />
  );
};

export default Categories;

import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import img from "../../assets/img01.jpg";
import CustomBtn from "../components/customBtn";
import { router } from "expo-router";

export function RenderItem({ data }) {
  const handleBorrow = useCallback(() => {
    router.push({ pathname: "/borrow", params: {
      id: data.id,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      image: data.imageUri // Make sure imageUri is the correct field containing the image URL
    } });
  }, []);

  const handleDonate = useCallback(() => {
    router.push({ pathname: "/donate", params: { item: JSON.stringify(data) } });
  }, [data]);

  // Ensure data.name is a string
  const itemName = typeof data.name === 'object' ? JSON.stringify(data.name) : data.name;

  // Determine image source
  const imageSource = data.imageUri ? { uri: data.imageUri } : img;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{itemName}</Text>
          <Text style={styles.subtitle}>Pick up location: {data.location}</Text>

          <View style={styles.statusContainer}>
            <Text style={data.quantity > 2 ? styles.inStock : styles.outOfStock}>
              {data.quantity > 2 ? "In store" : "Out of stock"}
            </Text>
            <Text style={styles.category}>{data.category}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <CustomBtn
              title="Borrow"
              containerStyle={styles.borrowButton}
              handlePress={handleBorrow}
              isDisabled={data.quantity < 2}
              accessibilityLabel={`Borrow ${itemName}`}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  inStock: {
    fontSize: 17,
    color: "#fff",
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  outOfStock: {
    fontSize: 17,
    color: "#ef4444",
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  category: {
    fontSize: 17,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  borrowButton: {
    backgroundColor: "#ef4444",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  donateButton: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

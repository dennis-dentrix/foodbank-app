import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "./components/customBtn";
import Locations from "./components/locations";
import { useLocalSearchParams } from "expo-router";
import { collection, db, updateItemQuantity } from "../lib/firebase";
import { Picker } from "@react-native-picker/picker";
import { addDoc, getDocs, query, where } from "firebase/firestore";

const BorrowScreen = () => {
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState();
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")

  const handleBorrow = async () => {
    const amountToBorrow = parseInt(amount, 10);
    const currentQuantity = parseInt(params.quantity, 10);

    if (isNaN(amountToBorrow) || amountToBorrow <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid amount to borrow.");
      return;
    }

    const newQuantity = currentQuantity - amountToBorrow;

    if (newQuantity < 0) {
      Alert.alert(
        "Insufficient quantity",
        "Not enough quantity available to borrow."
      );
      return;
    }

    try {
      // Update the item quantity in the foodList collection
      // await updateItemQuantity(params.id, newQuantity);

      // Add an entry to the borrowedItems collection
      const itemRef = collection(db, "borrowedFood");
      const q = query(
        itemRef,
        where("name", "==", name),
        where("category", "==", category),
        where("unit", "==", unit)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(itemRef, {
          name: params.name,
          amount,
          unit,
          location,
          
        });
      } else {
        querySnapshot.forEach(async (doc) => {
          const newQuantity = doc.data().quantity + parseInt(quantity);
          await updateDoc(doc.ref, { quantity: newQuantity, imageUri });
        });
      };

      Alert.alert("Success", "Item borrowed successfully.");
      setAmount(""); // Clear the input after successful borrowing
    } catch (error) {
      Alert.alert("Error", "Failed to update quantity.");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          {/* {params.image ? (
            <Image
              source={{ uri: params.image }}
              style={styles.image}
              resizeMode="contain"
              onError={() => Alert.alert("Error", "Failed to load image.")}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text>No Image Available</Text>
            </View>
          )} */}

          <View style={styles.header}>
            <Text style={styles.title}>{params.name}</Text>
            <Text style={styles.category}>{params.category}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.locationContainer}>
              <Text style={styles.label}>Select Pick up point</Text>
              <Picker
                selectedValue={location}
                onValueChange={(itemValue) => setLocation(itemValue)}
              >
                <Picker.Item
                  label="Asda Southgate Circus Supercenter"
                  value="Asda"
                />
                <Picker.Item label="Tesco Express" value="Tesco" />
                <Picker.Item label="Sainsbury's" value="Sainsbury" />
                <Picker.Item label="Lidl" value="Lidl" />
                <Picker.Item label="Aldi" value="Aldi" />
              </Picker>
            </View>

            <View>
              <Text style={styles.inputLabel}>Amount Borrowed:</Text>
              <TextInput
                placeholder="Amount"
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>

            <View>
              <Text style={styles.label}>Units Donated</Text>
              <Picker
                selectedValue={unit}
                onValueChange={(itemValue) => setUnit(itemValue)}
              >
                <Picker.Item label="Tonnes" value="tonnes" />
                <Picker.Item label="Kgs" value="kgs" />
                <Picker.Item label="Grams" value="grams" />
                <Picker.Item label="Liters" value="liters" />
                <Picker.Item label="Boxes" value="boxes" />
                <Picker.Item label="Pieces" value="pieces" />
                <Picker.Item label="Sacks" value="sacks" />
                <Picker.Item label="Containers" value="containers" />
              </Picker>
            </View>

            <CustomBtn
              title={"Borrow"}
              containerStyle={styles.button}
              handlePress={handleBorrow}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height: "85vh",
  },
  innerContainer: {
    marginHorizontal: 12,
  },
  image: {
    height: 192,
    width: "100%",
    borderRadius: 12,
  },
  imagePlaceholder: {
    height: 192,
    width: "100%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  category: {
    fontSize: 18,
    fontWeight: "600",
    borderColor: "#007bff",
    color: "#007bff",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  content: {
    marginTop: 16,
  },
  locationContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    fontSize: 18,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#6c757d",
  },
});

export default BorrowScreen;

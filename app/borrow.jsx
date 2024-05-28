import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "./components/customBtn";
import Locations from "./components/locations";
import { useLocalSearchParams } from "expo-router";
import { updateItemQuantity } from "../lib/firebase";

const BorrowScreen = () => {
  const params = useLocalSearchParams();
  console.log(params.image); // Debug log to check params
  const [amount, setAmount] = useState("");

  const handleBorrow = async () => {
    const amountToBorrow = parseInt(amount, 10);
    const currentQuantity = parseInt(params.quantity, 10);
    
    if (isNaN(amountToBorrow) || amountToBorrow <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid amount to borrow.");
      return;
    }

    const newQuantity = currentQuantity - amountToBorrow;

    if (newQuantity < 0) {
      Alert.alert("Insufficient quantity", "Not enough quantity available to borrow.");
      return;
    }

    try {
      await updateItemQuantity(params.id, newQuantity);
      Alert.alert("Success", "Item borrowed successfully.");
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
              source={{uri: params.image}}
              style={styles.image}
              resizeMode="contain"
              onError={() => Alert.alert('Error', 'Failed to load image.')}
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
              <Text style={styles.label}>Pick up Location</Text>
              <Locations />
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
    height: '85vh',
  },
  innerContainer: {
    marginHorizontal: 12,
  },
  image: {
    height: 192,
    width: '100%',
    borderRadius: 12,
  },
  imagePlaceholder: {
    height: 192,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 18,
    fontWeight: '600',
    borderColor: '#007bff',
    color: '#007bff',
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
    fontWeight: '600',
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
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6c757d',
  },
});

export default BorrowScreen;

import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import img from "../../assets/imgfruits.jpg";
import { Picker } from "@react-native-picker/picker";
import CustomBtn from "../components/customBtn";
import Locations from "../components/locations";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { router } from "expo-router";

const DonateScreen = () => {
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState();
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState("")

  const handleDonate = async () => {
    try {
      setLoading(true);
  
      // Check if an item with the same name, category, and unit already exists
      const itemRef = collection(db, "foodList");
      const q = query(itemRef, where("name", "==", name), where("category", "==", category));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        // If the item doesn't exist, add a new item to the collection
        const foodRef = await addDoc(itemRef, {
          name,
          quantity: parseInt(quantity),
          category,
          
        });
      } else {
        // If the item exists, update its quantity
        querySnapshot.forEach(async (doc) => {
          const newQuantity = doc.data().quantity + parseInt(quantity);
          await updateDoc(doc.ref, { quantity: newQuantity });
          console.log("Item updated with ID: ", doc.id);
        });
      }
  
      // Notifications.scheduleNotificationAsync({
      //   content: {
      //     title: 'Donation',
      //     body: "Donation made. Thank you",
      //   },
      //   trigger: null,
      // });
      Alert.alert("Donation made. Thank you")
      router.push("/home")  
    } catch (error) {
      console.log(error);
      alert("Could not add item. Try again");
    } finally {
      // setCategory("");
      // setQuantity("");
      // setLocation("")
      // setName("");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-gray-200 flex-1">
     <ScrollView>
     <View className="border-2 m-5 p-3 rounded-xl flex flex-row items-center space-x-4 ">
        <Image source={img} className="w-[100px] h-[100px] " />
        <Text className="text-xl font-bold text-end text-black">
          Donate fresh food
        </Text>
      </View>

      <View className="m-5">
        {/* SELECT CATEGORY */}
        <Text className="font-bold p-3 text-xl">Select Category</Text>
        <Picker selectedValue={category} onValueChange={(e) => setCategory(e)}>
          <Picker.Item label="Fruits" value="fruits" />
          <Picker.Item label="Cereals" value="cereals" />
          <Picker.Item label="Liquids" value="liquids" />
        </Picker>

        {/* QUANTITY */}
        <Text className="font-bold p-3 text-xl">Enter Quantity</Text>
        <TextInput
          className="bg-darkGray border rounded-lg p-3 mt-2 font-bold text-black"
          value={quantity}
          onChangeText={(e) => setQuantity(e)}
        />

        <Text className="font-bold p-3 text-xl">Item Name </Text>
        <TextInput
          className="bg-darkGray border rounded-lg p-3 mt-2 font-bold text-black"
          value={name}
          onChangeText={(e) => setName(e)}
        />

        {/* PICK UP POINT */}
        <Text className="font-bold p-3 text-xl">Select Pick up point</Text>
        <Locations value={location} setLocation={setLocation} />

        {/* DONATE CASH */}
        <View>
          <CustomBtn title={"Donate"} containerStyle={"bg-primary"} handlePress={handleDonate}/>
          <Text className="text-center">Or</Text>
          <CustomBtn title={"Donate cash instead "} />
        </View>
      </View></ScrollView> 
    </SafeAreaView>
  );
};

export default DonateScreen;

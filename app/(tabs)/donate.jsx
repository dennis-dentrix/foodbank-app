import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import DonationForm from "../components/DonationForm";

const DonateScreen = () => {
  const [foodList, setFoodList] = useState([]);
  const [isFetching, setisFetching] = useState(true);

  async function getFoodList() {
    try {
      const querySnapshot = await getDocs(collection(db, "foodList"));
      setFoodList(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          isborrowed: false,
        }))
      );
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Error fetching food list😪. Try again later.");
    } finally {
      setisFetching(false);
    }
  }

  useEffect(() => {
    getFoodList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      {!isFetching ? (
        <DonationForm />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DonateScreen;

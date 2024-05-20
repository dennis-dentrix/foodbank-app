import {
  View,
  Text,
  ScrollView,
  Image,
  ProgressBarAndroidComponent,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import img from "../assets/imgfruits.jpg";
import CustomBtn from "./components/customBtn";
import Locations from "./components/locations";

const BorrowScreen = () =>{
  const [amount, setAmount] = useState("");
  return (
    <SafeAreaView className="flex-1 h-full">
      <ScrollView className="h-[85vh]">
        <View className="mx-3">
          {/* img */}
          <Image
            source={img}
            className="h-48 w-full flex-1 rounded-lg
            "
            resizeMode="cover"
          />

          <View className="flex flex-row justify-between items-center mt-3">
            {/* NAME | CATEGORY */}
            <Text className="text-2xl font-bold">Rice</Text>
            {/* <TextInput
              placeholder="Amount"
              className="border-2 px-3 py-2 rounded-xl  placeholder:text-xl  "
              value={amount}
            /> */}
            <Text className="text-lg font-semibold border border-primary text-primary px-2 rounded-lg">
              Cereals
            </Text>

            {/* AMOUNT LEFT */}
          </View>

          {/* BORROWING FORM */}
          <View className="mt-4">
            <View className="my-4">
              <Text className="font-semibold text-lg ">Pick up Location</Text>
              <Locations />
            </View>

            <TextInput
              placeholder="Amount"
              className="border-2 px-3 py-2 rounded-xl  placeholder:text-xl  "
              value={amount}
            />

            <CustomBtn title={"Borrow"} containerStyle={"bg-secondary"}  />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BorrowScreen;

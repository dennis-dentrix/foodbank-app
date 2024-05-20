import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import img from "../../assets/img01.jpg";
import CustomBtn from "./../components/customBtn";
import { router } from "expo-router";
import Categories from "../components/Categories";
import { Menu } from "react-native-paper";
import AppMenu from "../components/AppMenu";
import { auth } from "../../lib/firebase";

const data = [
  { id: "1", name: "Food Name", price: "$300.00", image: img },
  { id: "2", name: "Food Name", price: "$300.00", image: img },
  { id: "3", name: "Food Name", price: "$300.00", image: img },
  { id: "4", name: "Food Name", price: "$300.00", image: img },
  { id: "5", name: "Food Name", price: "$300.00", image: img },
];

const categories = [
  { id: "1", name: "fruits" },
  { id: "2", name: "flour" },
  { id: "3", name: "Food Name" },
  { id: "4", name: "Food Name" },
  { id: "5", name: "Food Name" },
];

const handleDonate = () => {
  router.push("/donate");
};

const handleBorrow = (item) => {
  router.push("/borrow");
};

const logout = () => {
  auth.signOut()
  router.push('/signin')
  console.log("logged out")
}

const RenderItem = (item) => (
  <View className="p-3 bg-gray-200 my-2 rounded-lg shadow">
    <View className="flex flex-row items-center">
      <Image
        source={img}
        className="w-[120px] h-[100px] "
        resizeMode="contain"
      />

      <View className="flex-1">
        <Text className="text-xl font-bold">{item.name}</Text>
        <Text className="text-gray-600 text-lg tracking-wide">
          Minimum borrowing: 10kgs
        </Text>
        <Text className="text-primary text-sm">Instore</Text>
        <View className="flex flex-row justify-between mt-2">
          <CustomBtn
            title="Borrow"
            containerStyle="bg-red-500 text-white font-bold py-2 px-4 rounded"
            handlePress={handleBorrow}
            params={item}
          />
          <CustomBtn
            title="Donate"
            containerStyle="bg-primary text-white font-bold py-2 px-4 rounded"
            handlePress={handleDonate}
            
          />
        </View>
      </View>
    </View>
  </View>
);

const home = () => {
  
  const [refresh, setRefresh] = useState();
  const onRefresh = async () => {
    setRefresh(true);
    // REFETCH THE DATA
    setRefresh(false);
  };
  

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem data={item ?? []} />}
        ListHeaderComponent={() => (
          <View>
            
            {/* <View className="px-2 py-3 shadow flex flex-row justify-between items-center mb-3">
              <View className="flex flex-row items-center gap-x-3">
                <TouchableOpacity className="p-2 bg-primary rounded-full">
                  <Ionicons name="person-outline" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-lg">Welcome, Denis 👋</Text>
              </View>
              <TouchableOpacity className="p-2  rounded-full">
                <Ionicons name="notifications" size={24} color="#707070" />
              </TouchableOpacity>
            </View> */}
          <AppMenu handleLogout={logout}  />

            <View>
              <Text className="text-xl font-medium pb-3 px-2">Categories</Text>
              <Categories />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
      />
    </SafeAreaView>
  );
};

export default home;

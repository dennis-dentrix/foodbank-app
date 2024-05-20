import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const NotificationScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="text-2xl px-3 py-4">Notifications</Text>

       <View className="space-y-5" >
       <View className="bg-gray-200 mx-2 px-3 py-2 flex flex-row space-x-3 items-center ">
          <AntDesign name="infocirlce" size={24} color="green" />
          <View>
            <Text className="font-bold text-xl">Oder</Text>
            <Text>Your order is ready. You can go pick it up within 48hrs</Text>
          </View>
        </View>

        <View className="bg-gray-200 mx-2 px-3 py-2 flex flex-row space-x-3 items-center ">
          <AntDesign name="infocirlce" size={24} color="green" />
          <View>
            <Text className="font-bold text-xl">Oder</Text>
            <Text>Your order is ready. You can go pick it up within 48hrs</Text>
          </View>
        </View>

        <View className="bg-gray-200 mx-2 px-3 py-2 flex flex-row space-x-3 items-center ">
          <AntDesign name="infocirlce" size={24} color="green" />
          <View>
            <Text className="font-bold text-xl">Oder</Text>
            <Text>Your order is ready. You can go pick it up within 48hrs</Text>
          </View>
        </View>

       </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

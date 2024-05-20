import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const TabIcon = ({ name, focused }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Entypo
        name={name}
        size={28}
        color={`${focused ? "white" : "#707070"}`}
      />
      <Text
        className={`${
          focused ? "font-bold text-white" : "font-light text-white"
        }`}
      >
        Home
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
    
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#136e63",
          tabBarInactiveTintColor: "#b6d6d2",
          tabBarStyle: {
            backgroundColor: "#136e63",
            color: "#fefefe",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon name="home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="donate"
          options={{
            title: "Donate",
            headerShown: false,
            tabBarIcon: ({ name, focused }) => {
              return (
                <>
                  <Entypo
                    name="slideshare"
                    size={28}
                    color={`${focused ? "white" : "#707070"}`}
                  />
                  <Text
                    className={`${
                      focused
                        ? "font-bold text-white"
                        : "font-light text-white"
                    }`}
                  >
                    Donate
                  </Text>
                </>
              );
            },
          }}
        />

        <Tabs.Screen
          name="notification"
          options={{
            title: "notification",
            headerShown: false,
            tabBarIcon: ({ name, focused }) => {
              return (
                <>
                  <Ionicons
                    name="notifications"
                    size={28}
                    color={`${focused ? "white" : "#707070"}`}
                  />
                  <Text
                    className={`${
                      focused
                        ? "font-bold text-white"
                        : "font-light text-white"
                    }`}
                  >
                    Notification
                  </Text>
                </>
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

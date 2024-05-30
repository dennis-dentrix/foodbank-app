import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Menu, Provider } from "react-native-paper";
import Locator from "./Locator";

const AppMenu = ({ handleLogout, userName }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleMenuItemPress = (action) => {
    closeMenu();
    // Handle the action (e.g., navigate to profile, settings, logout)
    console.log(action);
  };

  return (
    <Provider>
      <View className="px-2 py-3 shadow flex flex-row items-center mb-3">
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <View className="flex flex-row justify-between w-full" >
              <TouchableOpacity
                onPress={openMenu}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View className="p-2 bg-primary rounded-full ">
                  <Ionicons name="person-outline" size={20} color="white" />
                </View>
                <Text style={{ marginLeft: 10 }}>Welcome, {userName} 👋</Text>
              </TouchableOpacity>
              <Locator />
            </View>
          }
        >
          <View className="bg-primary color-wite z-50">
            {/* <Menu.Item
          onPress={() => handleMenuItemPress("Profile")}
            title="Profile"
            titleStyle={{ color: '#fff' }} 
          />
          <Menu.Item
            onPress={() => handleMenuItemPress('settings')}
            title="Settings"
            titleStyle={{ color: '#fff' }} 
          /> */}
            <Menu.Item
              onPress={() => handleLogout()}
              title="Logout"
              titleStyle={{ color: "#fff" }}
            />
          </View>
        </Menu>
      </View>
    </Provider>
  );
};

export default AppMenu;
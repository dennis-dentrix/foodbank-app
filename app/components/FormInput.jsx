import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const FormInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  keyboardType,
  autocapitalize,
  secureTextEntry
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="space-y-3">
      <Text className="text-base text-gray-100">{title}</Text>
      <View
        className={`w-full h-[52px] bg-secondary rounded-lg focus:border-2 focus:border-red-400 items-center flex-row px-4`}
      >
        <TextInput
          className="flex-1 text-white font-semibold text-base w-full "
          value={value}
          onChangeText={handleChangeText}
          placeholderTextColor={"#7b7b8b"}
          placeholder={placeholder}
          secureTextEntry={showPassword ?  false : secureTextEntry}

          keyboardType={keyboardType}
          autoCapitalize={autocapitalize}
          
        />
        {/* keyboardType={title === "Email" ?  "email-address" : "default"} */}
        {title === "Password" || title === "Confirm Password" ? (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Feather name="eye" size={20} color="white" />
            ) : (
              <Feather name="eye-off" size={20} color="white" />
            )}
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default FormInput;

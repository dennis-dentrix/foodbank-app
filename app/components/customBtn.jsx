import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomBtn = ({title, handlePress, containerStyle, isLoading, textStyles}) => {
  return (
    <TouchableOpacity className={`bg-red-500 border-none rounded-xl px-4 py-2 my-4 ${containerStyle} ${isLoading ? "opacity-50" : ""}`} onPress={handlePress} activeOpacity={0.7} disabled={isLoading}  >
        <Text className={`text-xl font-bold text-center text-white ${textStyles}`} >
          {
            isLoading ? "Loading..." : title
          }
          </Text>
    </TouchableOpacity>
  )
}

export default CustomBtn
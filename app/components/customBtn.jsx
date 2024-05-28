import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomBtn = ({title, handlePress, containerStyle, isLoading, textStyles, isDisabled}) => {
  return (
    <TouchableOpacity className={`bg-red-500 border-none rounded-xl px-4 py-2 my-4 ${containerStyle} ${isLoading ? "opacity-50" : ""} ${isDisabled ? "bg-red-200" : ""} `} onPress={handlePress} activeOpacity={0.7} disabled={isLoading || isDisabled} >
        <Text className={`text-xl font-bold text-center text-white justify-center ${textStyles}`} >
          {
             isLoading ? <ActivityIndicator size="large" color="green" className="justify-center" /> : title
          }
          </Text>
    </TouchableOpacity>
  )
}

export default CustomBtn
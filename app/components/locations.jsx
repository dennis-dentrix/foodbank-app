import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Locations = ({location, setLocation}) => {
  return (
    <Picker
      selectedValue={location}
      onValueChange={(e) => setLocation(e)}
      className="border"
    >
      <Picker.Item label="Asda Southgate Circus Supeercenter" value={"Asda"} />
      <Picker.Item label="Tesco Express" value={"Tesco"} />
      <Picker.Item label="Sainsbury's" value={"Sainsbury"} />
      <Picker.Item label="Lidl" value={"Lidl"} />
      <Picker.Item label="Aldi" value={"Aldi"} />
    </Picker>
  );
};

export default Locations;

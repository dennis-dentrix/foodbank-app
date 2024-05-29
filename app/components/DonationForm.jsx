import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import CustomBtn from "../components/customBtn";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const DonationForm = ({  }) => {
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDonate = async () => {
    if (!name || !category || !quantity || !unit || !location ) {
      alert("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);

      const imageUri = await uploadImageAsync(image);
      const itemRef = collection(db, "foodList");
      const q = query(
        itemRef,
        where("name", "==", name),
        where("category", "==", category),
        where("unit", "==", unit)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(itemRef, {
          name,
          quantity: parseInt(quantity),
          category,
          unit,
          location,
          imageUri,
        });
      } else {
        querySnapshot.forEach(async (doc) => {
          const newQuantity = doc.data().quantity + parseInt(quantity);
          await updateDoc(doc.ref, { quantity: newQuantity, imageUri });
        });
      }


      router.replace("home");
    } catch (error) {
      console.log(error);
      alert("Could not add item. Try again");
    } finally {
      setCategory("");
      setName("");
      setQuantity("");
      setUnit("");
      setLocation("");
      setImage(null);
      setLoading(false);
    }
  };

  const uploadImageAsync = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `donations/${filename}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>Donate fresh food</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Select Category</Text>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
          <Picker.Item label="Fruits" value="fruits" />
          <Picker.Item label="Cereals" value="cereals" />
          <Picker.Item label="Liquids" value="liquids" />
          <Picker.Item label="Vegetables" value="vegetables" />
          <Picker.Item label="Meat" value="meat" />
        </Picker>

        <Text style={styles.label}>Item Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={(e) => setName(e)} />

        <Text style={styles.label}>Enter Quantity</Text>
        <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />

        <Text style={styles.label}>Units Donated</Text>
        <Picker selectedValue={unit} onValueChange={(itemValue) => setUnit(itemValue)}>
          <Picker.Item label="Tonnes" value="tonnes" />
          <Picker.Item label="Kgs" value="kgs" />
          <Picker.Item label="Grams" value="grams" />
          <Picker.Item label="Liters" value="liters" />
          <Picker.Item label="Boxes" value="boxes" />
          <Picker.Item label="Pieces" value="pieces" />
          <Picker.Item label="Sacks" value="sacks" />
          <Picker.Item label="Containers" value="containers" />
        </Picker>

        <Text style={styles.label}>Select Pick up point</Text>
        <Picker selectedValue={location} onValueChange={(itemValue) => setLocation(itemValue)}>
          <Picker.Item label="Asda Southgate Circus Supercenter" value="Asda" />
          <Picker.Item label="Tesco Express" value="Tesco" />
          <Picker.Item label="Sainsbury's" value="Sainsbury" />
          <Picker.Item label="Lidl" value="Lidl" />
          <Picker.Item label="Aldi" value="Aldi" />
        </Picker>

        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>Add Item Picture</Text>
          <View style={styles.imageUploadButtons}>
            <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
              <Ionicons name="image-outline" size={30} color="#ccc" />
              <Text style={styles.iconButtonText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
              <Ionicons name="camera-outline" size={30} color="#ccc" />
              <Text style={styles.iconButtonText}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

        {uploading && <ActivityIndicator size="large" color="#0000ff" />}

        <CustomBtn
          title="Donate"
          containerStyle={styles.button}
          handlePress={handleDonate}
          isLoading={loading}
        />
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  formContainer: {
    margin: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#093731",
    color: "#fff",
    padding: 16,
    borderRadius: 8,
    textAlign: "center",
  },
  imageUploadContainer: {
    marginVertical: 16,
  },
  imageUploadButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    alignItems: "center",
  },
  iconButtonText: {
    fontSize: 14,
    color: "#ccc",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 16,
    borderRadius: 8,
  },
});

export default DonationForm;

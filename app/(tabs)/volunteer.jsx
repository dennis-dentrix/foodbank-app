import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { auth, db, addDoc } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import * as Notifications from "expo-notifications"
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../lib/firebase";
import { useGlobalContext } from "../services/userContext";

const VolunteerScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [availability, setAvailability] = useState("");
  const [userdata, setuserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation()

  const {userName} = useGlobalContext()

  async function getUserData() {
    const q = query(
      collection(db, "users"),
      where("email", "==", auth.currentUser.email)
    );
    const querySnapshot = await getDocs(q);

    setuserData(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        setName(userName);
      } else {
        setEmail("");
        setName("");
      }
    });
    return unsubscribe;
  }, []);

  async function addVolunteer() {
    try {
      setLoading(true);
      const foodRef = await addDoc(collection(db, "volunteer"), {
        name,
        email,
        phone,
        role,
        availability,
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Volunteer",
          body: "Your application has been received.",
        },
        trigger: null,
      });
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      setError(err)
      alert("Could not add item. Try again");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    console.log("Submitted");
    if (!name || !email || !phone || !role || !availability) {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    addVolunteer()
      .then(() => {
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        alert("Could not add item. Try again");
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Become a Volunteer</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Volunteer Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
        >
          <Picker.Item label="Select Role" value="" />
          <Picker.Item label="Food Sorting" value="foodSorting" />
          <Picker.Item label="Food Distribution" value="foodDistribution" />
          <Picker.Item label="Event Coordination" value="eventCoordination" />
          {/* Add more roles as needed */}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Availability</Text>
        <TextInput
          style={styles.input}
          value={availability}
          onChangeText={setAvailability}
          placeholder="Enter your availability (days and times)"
        />
      </View>

{
  loading ? <ActivityIndicator size={"large"} color={"#0000ff"} /> :  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
  <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>
}
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VolunteerScreen;

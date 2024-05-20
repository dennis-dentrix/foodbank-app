import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { auth, addDoc, collection, db } from "../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, addDoc, collection, db } from "../../lib/firebase";
import { router } from "expo-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const register = async () => {
    setLoading(true);
    if (password === confirmPassword) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = response.user;
        console.log("Response Email.", {...response})

        const userRef = collection(db, "users");
        const newUserRef = await addDoc(userRef, {
          username, email
        })
       
        setUsername("");
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        alert("Account created successfully. ");
       router.push("/home")
        return user;
      } catch (error) {
        console.log(error);
        alert(`Could not create account `);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Passwords do not match. Try again");
      setLoading(false);
    }
  };

 
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {!loading ? (
          <TouchableOpacity onPress={() => register()}>
            <Text style={styles.registerBtn}>Register</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
       
        <View>
          <Text>By registering you agree to the terms of the app.</Text>
        </View>

        <View style={styles.registerContainer}>
          <TouchableOpacity>
            <Text style={styles.registergoogle}>Signin with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.registerApple}>Signin with Apple</Text>
          </TouchableOpacity>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: 600, color: "#ff8a80", fontSize: 20 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  registerBtn: {
    backgroundColor: "#E4EEF4",
    color: "#24222A",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: 300,
  },
  registerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginVertical: 20,
  },
  registergoogle: {
    backgroundColor: "#ff8a80",
    color: "#24222A",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: 300,
  },
  registerApple: {
    backgroundColor: "#0088cc",
    color: "#eee",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: 300,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DBDDE9",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
});

export default Signup;

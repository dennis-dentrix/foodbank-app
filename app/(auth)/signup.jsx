import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, addDoc, collection, db } from "../../lib/firebase";
import { router } from "expo-router";
import FormInput from "../components/FormInput";
import CustomBtn from "../components/customBtn";
import logo from "../../assets/logo.png";

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
          password
        );
        const user = response.user;
        console.log("Response Email.", { ...response });

        const userRef = collection(db, "users");
        const newUserRef = await addDoc(userRef, {
          username,
          email,
        });

        setUsername("");
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        alert("Account created successfully. ");
        router.push("/home");
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>Create an account</Text>

          <View className="w-full" >

          <FormInput
            placeholder={"Full Name"}
            value={username}
            handleChangeText={setUsername}
            title={"Full Name"}
          />

          <FormInput
            placeholder={"Email"}
            value={email}
            handleChangeText={setEmail}
            keyboardType={"email-address"}
            autoCapitalize="none"
            title={"Email "}
          />

          <FormInput
            placeholder="Password"
            value={password}
            handleChangeText={setPassword}
            secureTextEntry
            title="Password"
          />

          <FormInput
            placeholder="Confirm Password"
            value={confirmPassword}
            handleChangeText={setConfirmPassword}
            secureTextEntry
            title={"Confirm Password"}
          />

          {!loading ? (
            <CustomBtn
              title={"Register"}
              containerStyle={styles.button}
              handlePress={() => register()}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}

          </View>
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By registering you agree to the terms of the app.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <TouchableOpacity onPress={() => router.push("signin")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#136e63",
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#136e63",
    borderRadius: 12,
    
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#093731",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#093731",
    width: "100%",
  },
  termsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  termsText: {
    color: "#093731",
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center"
  },
  footerText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "medium"
  },
  loginLink: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Signup;

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import logo from "../../assets/logo.png"
import CustomBtn from "../components/customBtn";
import { router } from "expo-router";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password reset email sent successfully.");
      setEmail("");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to send password reset email. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Reset Password</Text>

          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <View className="w-[100%]" >
          <CustomBtn
            title="Send Reset Email"
            handlePress={handleResetPassword}
            isLoading={isSubmitting}
            containerStyle={styles.button}
          />
          <TouchableOpacity onPress={() => router.back()} >
            <Text className="text-[#f2f3f4] underline underline-offset-4 " >Back to Login page. </Text>
          </TouchableOpacity>
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
    color: "#f2f3f4",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DBDDE9",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#093731",
    width: "100%",
  },
});

export default ResetPassword;

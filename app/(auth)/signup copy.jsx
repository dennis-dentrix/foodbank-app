import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, KeyboardAvoidingView } from "react-native";
import { createUser } from "../../lib/appwrite";
import FormInput from "../components/FormInput";
import CustomBtn from "../components/customBtn";

const SignUp = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (form.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      // Assume the user creation is successful and proceed to sign in
      Alert.alert("Success", "Account created successfully!");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#121212", height: "100%" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: 16,
              marginTop: 24,
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            {/* <Image source={images.logo} resizeMode="contain" style={{ width: 115, height: 34 }} /> */}

            <Text style={{ fontSize: 24, fontWeight: "600", color: "#FFF", marginTop: 40 }}>
              Sign Up to Food Bank
            </Text>

            <FormInput
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles={{ marginTop: 40 }}
            />

            <FormInput
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles={{ marginTop: 28 }}
              keyboardType="email-address"
            />

            <FormInput
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles={{ marginTop: 28 }}
              secureTextEntry
            />

            <CustomBtn
              title="Sign Up"
              handlePress={submit}
              containerStyles={{ marginTop: 28 }}
              isLoading={isSubmitting}
            />

            <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 20 }}>
              <Text style={{ fontSize: 16, color: "#CCC" }}>Have an account already?</Text>
              <Link href="/signin" style={{ fontSize: 18, fontWeight: "600", color: "#E91E63", marginLeft: 8 }}>
                Login
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

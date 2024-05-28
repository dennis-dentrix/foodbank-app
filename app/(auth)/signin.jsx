import React, { useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, Image, Alert, StyleSheet } from 'react-native'
import { Link, router } from 'expo-router'
import logo from '../../assets/logo.png'
import FormInput from '../components/FormInput'
import CustomBtn from '../components/customBtn'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async () => {
    setIsSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      Alert.alert("Logged in successfully.")
      router.push("/home")
    } catch (error) {
      console.log(error)
      Alert.alert("Could not sign you in. Try again.")
    }
    setIsSubmitting(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
          <Text style={styles.welcomeText}>Welcome to the app</Text>

          <View className="w-full" >
          <FormInput
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormInput
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            secureTextEntry
          />

          <CustomBtn
            title={"Login"}
            handlePress={handleLogin}
            isLoading={isSubmitting}
            containerStyle={styles.button}
          />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Link href='/signup' style={styles.signUpLink}>
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#136e63',
  },
  scrollView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#136e63',
    borderRadius: 12,
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#093731',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#093731',

  
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    
  },
  footerText: {
    color: '#000',
    fontSize: 16,
  },
  signUpLink: {
    color: '#f2f3f4',
    fontWeight: 'bold',
  },
})

export default SignIn

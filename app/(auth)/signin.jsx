import React, { useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, Image, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import logo from '../../assets/logo.png'
import FormInput from '../components/FormInput'
import CustomBtn from '../components/customBtn'
import { auth } from '../../lib/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  

  const handleLogin = async () => {
    setIsSubmitting(true)
    try{
      await signInWithEmailAndPassword(auth, form.email, form.password)
      Alert.alert("Logged in succesfully.")
      router.push("/home")
    } catch(error) {
      console.log(error)
      Alert.alert("Could not sign you in. Try again.")
    }
    setIsSubmitting(false)
  }
  return (
    <SafeAreaView className="bg-primary h-full" >
      <ScrollView>
      <View className="w-full justify-center min-h-[85vh] px-4 my-6" >
      <Image source={logo} className="h-[120px] w-[120px] justify-center " resizeMode='contain' />
      <Text className="text-center text-2xl font-bold mt-4 text-white ">Welcome to the app</Text>

      <FormInput title="Email" value={form.email} handleChangeText={(e) => setForm({...form, email: e})} keyboardType="email-address"  />
      <FormInput title="Password" value={form.password} handleChangeText={(e) => setForm({...form, password: e})}   />

      <CustomBtn title={"Login"} handlePress={handleLogin} isLoading={isSubmitting} />

      <View className="justify-center pt-5 flex-row gap-2" >
        <Text className="text-center text-white text-lg ">Don't have an account? <Link className="text-red-500 font-bold text-lg" href='/signup' >Sign up</Link></Text>

      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
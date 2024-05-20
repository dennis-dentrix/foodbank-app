import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {  Image, ScrollView, Text, Touchable, View  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import img1 from '../assets/img01.jpg'
import img2 from '../assets/imgrice.jpg'
import logo from '../assets/logo.png'
import CustomBtn from './components/customBtn';
import { useGlobalContext } from './context/userContext';


export default function App() {
  const { isLoading, isLogged } = useGlobalContext()

  if (!isLoading && isLogged) return <Redirect href="/home" />; 
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="relative mt-5" >
         <Image source={logo}
          className="w-full h-[100px]" resizeMode='contain' />

         </View>
        <View className="w-full justify-center items-center h-full px-4" >
          <Image source={img1}
          className="max-w-[380px] w-full h-[300px] skew-x-8 skew-y-12 " resizeMode='contain' />
         <View className="relative mt-5" >
          <Text className="text-2xl font-bold py-5  text-white text-center flex">Feeding Hope, 
          <Text>Nourishing Communities</Text>
          </Text>
            <CustomBtn title={"Get Started"} handlePress={() => router.push("/signin")}  />
         </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'  />
    </SafeAreaView>
  );
}


import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, Touchable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import img1 from "../assets/img01.jpg";
import img2 from "../assets/imgrice.jpg";
import logo from "../assets/logo.png";
import CustomBtn from "./components/customBtn";
import { useGlobalContext } from "./services/userContext";

export default function App() {
  const { isLoading, isLoggedin } = useGlobalContext();

  if (!isLoading && isLoggedin) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <View className="relative mt-5 ">
          <Image
            source={logo}
            className="w-full"
            resizeMode="contain"
          />
        </View>
        {/* <Image
          source={img1}
          className="max-w-[380px] w-full h-[300px] skew-x-8 skew-y-12 "
          resizeMode="contain"
        /> */}

        <View className="relative mt-5 w-full px-4 ">
          <Text className="text-2xl font-bold py-5  text-white text-center flex">
            Feeding Hope,
            <Text>Nourishing Communities</Text>
          </Text>
          <CustomBtn
            title={"Get Started"}
            handlePress={() => router.push("/signin")}
          />
        </View>
        {/* <View className="w-full  h-full px-4"></View> */}
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

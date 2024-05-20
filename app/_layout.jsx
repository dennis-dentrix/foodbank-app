import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GlobalProvider } from "./context/userContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    Reddit: require("../assets/static/RedditSans-Black.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  if (!fontsLoaded && !error) return null;
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="borrow" />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;

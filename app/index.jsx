import "react-native-url-polyfill/auto";
import { Redirect, router } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import images from "../constants/images";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { isLoading, isLogged } = useGlobalContext();
  if (!isLoading && isLogged) return <Redirect href={"Home"} />;
  if (isLoading) return <ActivityIndicator size="large" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%", flex: 1 }}>
        <View className="min-h-[85vh] w-full p-4 items-center justify-center">
          <Logo />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5 mb-5">
            <Text className="text-3xl text-center font-pbold text-white">
              Explore endless possibilities with
              <Text className=" text-secondary-200"> Vido!</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              className="w-[136px] h-[15px] absolute -bottom-1 -right-6"
            />
          </View>
          <Text className="font-pregular text-sm text-gray-100 mt-7 text-center">
            Where creativity meets discovery, Create your own art!!
          </Text>

          <CustomButton
            label="Get Started with Email"
            handlePress={() => router.push("/SignIn")}
            containerStyle={"w-full mt-7"}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161621" />
    </SafeAreaView>
  );
}

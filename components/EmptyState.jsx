import { View, Text, Image } from "react-native";
import React from "react";
import images from "../constants/images";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ subtitle }) => {
  return (
    <View className="px-4 items-center justify-center">
      <Image source={images.empty} className="w-[270px] h-[215px]" />
      <Text className="text-white font-psemibold text-center">
        No videos found...
      </Text>
      <Text className="text-white font-pregular text-sm text-center mt-2">
        {subtitle || "You can create a video by tapping on the button below"}
      </Text>
      <CustomButton
        label="Create a video"
        handlePress={() => router.push("Create")}
        containerStyle="my-5 w-full"
      />
    </View>
  );
};

export default EmptyState;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  label,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center min-h-[62px] bg-secondary rounded-xl ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-primary font-pbold ${textStyle}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

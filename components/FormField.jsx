import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { TouchableOpacity } from "react-native";

const FormField = ({
  label,
  value,
  handleTextChange,
  keyBoardType,
  otherStyles,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2  mt-7 ${otherStyles}`}>
      <Text className="text-gray-100 text-base font-pmedium ">{label}</Text>
      <View
        className={`border border-black-200 focus:border-secondary bg-black-100 rounded-2xl w-full h-16 px-4`}
      >
        <TextInput
          onChangeText={handleTextChange}
          value={value}
          keyboardType={keyBoardType}
          className="flex-1 text-base font-pregular text-gray-100"
          secureTextEntry={label === "Password" && !showPassword}
          placeholder={placeholder}
          placeholderTextColor="gray"
        />
        {label === "Password" && (
          <TouchableOpacity
            className="flex items-center justify-center absolute right-4 top-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

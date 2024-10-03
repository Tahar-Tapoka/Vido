import { View, Text, Image } from "react-native";
import images from "../constants/images";

const Logo = () => (
  <View className="flex-row items-center justify-center">
    <Image
      source={images.logoSmall}
      className="w-[70px] h-[54px]"
      resizeMode="contain"
    />
    <Text className="text-3xl font-pextrabold text-white">Vido!</Text>
  </View>
);

export default Logo;

import { View, Text, Image } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import images from "../constants/images";
import SearchField from "./SearchField";

const HomeHeader = ({ title, subtitle }) => {
  return (
    <View className="my-2 ">
      <View className="flex-row items-center justify-between px-4">
        <View>
          <Text className=" font-pregular text-gray-100">{subtitle}</Text>
          <Text className="text-2xl font-pbold text-white ">{title}</Text>
        </View>
        <Image
          source={images.logoSmall}
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>
      <SearchField />
    </View>
  );
};

export default HomeHeader;

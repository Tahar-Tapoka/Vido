import { View, TextInput, Image, Alert } from "react-native";
import icons from "../constants/icons";
import { TouchableOpacity } from "react-native";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";

const SearchField = () => {
  const pathName = usePathname();
  const { query: initialQuery } = useLocalSearchParams();
  const [query, setQuery] = useState(initialQuery);

  return (
    <View
      className={` mx-5 border border-black-200 focus:border-secondary bg-black-100 rounded-2xl h-16 px-4 my-5`}
    >
      <TextInput
        onChangeText={(e) => setQuery(e)}
        value={query}
        className="flex-1 text-base font-psemibold text-gray-100"
        placeholder="Search for videos and topics"
        placeholderTextColor="gray"
      />
      <TouchableOpacity
        className="flex items-center justify-center absolute right-4 top-4"
        onPress={() => {
          if (!query)
            return Alert.alert(
              "Missing Query",
              "Please enter a search query..."
            );
          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-6 h-6" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;

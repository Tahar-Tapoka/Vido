import { View, Text, FlatList, Image, Alert } from "react-native";

import ThemeView from "../../components/ThemeView";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import icons from "../../constants/icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged, setLoading } = useGlobalContext();
  const { data: userPosts } = useAppwrite(() => getUserPosts(user.$id));

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("SignIn");
  };
  const handlePress = () => {
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: logOut },
      ],
      { cancelable: false }
    );
  };
  return (
    <ThemeView>
      <FlatList
        ListHeaderComponent={() => (
          <View className="mb-7 items-center justify-center">
            <TouchableOpacity
              onPress={handlePress}
              className="absolute top-0 right-7"
            >
              <Image
                source={icons.logout}
                className="w-7 h-7 "
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="mt-3 rounded-lg border border-secondary w-[70px] h-[70px] p-0.5 justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className="w-full h-full rounded-lg"
              />
            </View>

            <Text className="text-white font-psemibold text-2xl mt-3">
              {user?.username}
            </Text>
            <View className="flex-row items-center gap-5 ">
              <View className="items-center">
                <Text className="text-white font-psemibold text-2xl">
                  {userPosts.length}
                </Text>
                <Text className="text-gray-400 font-pregular text-sm">
                  Posts
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-white font-psemibold text-2xl">2.3k</Text>
                <Text className="text-gray-400 font-pregular text-sm">
                  Views
                </Text>
              </View>
            </View>
          </View>
        )}
        data={userPosts}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={EmptyState}
      />
    </ThemeView>
  );
};

export default Profile;

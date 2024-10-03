import { View, Text, Image } from "react-native";
import Colors from "../constants/Colors";
import icons from "../constants/icons";
import images from "../constants/images";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="px-4 mb-14 items-center">
      <View className="flex-row items-start gap-3">
        <View className="flex-row flex-1 items-center ">
          <View className="rounded-lg border border-secondary w-[46px] h-[46px] p-0.5 justify-center items-center">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm ml-3"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs ml-3"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>
      <TouchableOpacity
        className=" pt-2 w-full h-60 rounded-xl  relative justify-center items-center"
        onPress={() => setPlay(!play)}
      >
        {play ? (
          <Video
            source={{ uri: video }}
            className="h-full w-full rounded-xl mt-3 bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) setPlay(false);
            }}
          />
        ) : (
          <>
            <Image
              source={{ uri: thumbnail }}
              resizeMode="cover"
              className="h-full w-full rounded-xl mt-3"
            />
            <Image
              source={icons.play}
              resizeMode="contain"
              className="h-12 w-12 absolute"
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VideoCard;

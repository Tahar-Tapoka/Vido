import { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import icons from "../constants/icons";
import { TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: { scale: 0.8 },
  1: { scale: 1 },
};
const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.8 },
};
const TrendingItem = ({ video, activeItem }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-2"
      animation={activeItem === video.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center items-center"
        onPress={() => setPlay(!play)}
      >
        {play ? (
          <Video
            source={{ uri: video.video }}
            className="h-72 w-52 rounded-[35px] mt-3 bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) setPlay(false);
            }}
          />
        ) : (
          <>
            <ImageBackground
              source={{ uri: video.thumbnail }}
              resizeMode="cover"
              className="h-72 w-52 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40"
            />
            <Image
              source={icons.play}
              resizeMode="contain"
              className="h-12 w-12 absolute"
            />
          </>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default TrendingItem;

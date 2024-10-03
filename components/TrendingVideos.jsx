import { View, Text, FlatList } from "react-native";
import TrendingItem from "./TrendingItem";
import { useState } from "react";

const TrendingVideos = ({ posts }) => {
  const [activeVideo, setActiveVideo] = useState(posts[1]?.$id);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveVideo(viewableItems[0].key);
    }
  };
  return (
    <View className="flex w-full ">
      <Text className="text-gray-100 font-pmedium text-lg px-6">
        Trending Videos
      </Text>
      <View className="flex-row items-center justify-between">
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <TrendingItem video={item} activeItem={activeVideo} />
          )}
          keyExtractor={(item) => item.$id}
          horizontal
          viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
          contentOffset={{ x: 170 }}
          onViewableItemsChanged={viewableItemsChanged}
        />
      </View>
    </View>
  );
};

export default TrendingVideos;

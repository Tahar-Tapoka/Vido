import { View, Text, FlatList } from "react-native";

import HomeHeader from "../../components/HomeHeader";
import ThemeView from "../../components/ThemeView";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { getUserPosts } from "../../lib/appwrite";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: userPosts, isLoading } = useAppwrite(() =>
    getUserPosts(user.$id)
  );
  return (
    <ThemeView>
      <FlatList
        ListHeaderComponent={() => (
          <HomeHeader title="Saved Posts" subtitle="Brows your:" />
        )}
        data={userPosts}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={() => (
          <EmptyState subtitle="No results found for your query" />
        )}
      />
    </ThemeView>
  );
};

export default Bookmark;

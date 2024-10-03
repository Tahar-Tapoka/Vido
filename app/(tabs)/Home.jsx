import { FlatList, RefreshControl } from "react-native";
import { useState } from "react";

import { useGlobalContext } from "../../context/GlobalProvider";
import HomeHeader from "../../components/HomeHeader";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import TrendingVideos from "../../components/TrendingVideos";
import ThemeView from "../../components/ThemeView";

const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ThemeView>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <HomeHeader title={user?.username} subtitle="Welcome back!" />
            <TrendingVideos posts={latestPosts} />
          </>
        )}
        data={posts}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={EmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </ThemeView>
  );
};

export default Home;

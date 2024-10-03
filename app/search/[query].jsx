import { RefreshControl, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import HomeHeader from "../../components/HomeHeader";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import ThemeView from "../../components/ThemeView";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: searchResults, refetch } = useAppwrite(() =>
    searchPosts(query)
  );

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <ThemeView>
      <FlatList
        ListHeaderComponent={() => (
          <HomeHeader title={query} subtitle="Search Results" />
        )}
        data={searchResults}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={() => (
          <EmptyState subtitle="No results found for your query" />
        )}
      />
    </ThemeView>
  );
};

export default Search;

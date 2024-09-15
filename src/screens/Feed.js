import React, { useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Header from "../components/Header";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/actions/posts";

const Feed = () => {
    const dispatch = useDispatch();

    // Estado global redux
    const posts = useSelector((state) => state.posts.posts);
    const isUploading = useSelector((state) => state.posts.isUploading);
    
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <Post key={item.id} {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});

export default Feed;

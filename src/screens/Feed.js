import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Header from "../components/Header";
import Post from "../components/Post";
import { useSelector } from "react-redux";

const Feed = () => {
    // estado global redux
    const posts = useSelector((state) => state.posts.posts)
    return(
        <View style={styles.container}>
            <Header/>
            <FlatList
                data={posts}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <Post {...item} />}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    }
})

export default Feed;
import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Author from './Author';
import Comments from "./Comments";
import AddComment from "./addComment";
import { useSelector } from "react-redux";

const Post = ({image, comments, email, nickname, id}) => {
    // variaveis globais redux
    const name = useSelector((state) => state.user.name);
    const addComment = name ? <AddComment postId={id} /> : null;
    
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image}/>
            <Author email={email} nickname={nickname}/>
            <Comments comments={comments} />
            {addComment}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').width * 3/4,
        resizeMode: 'contain'
    }
})

export default Post;
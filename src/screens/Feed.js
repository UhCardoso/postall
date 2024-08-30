import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Header from "../components/Header";
import Post from "../components/Post";

const Feed = () => {
    const [posts, setPosts] = useState([
        {
            id: Math.random(),
            nickname: 'Werlen.santos',
            email: 'werle@gmail.com',
            image: require('../../assets/imgs/fence.jpg'),
            comments: [{
                nickname: 'carlos.sousa',
                comment: 'gostei'
            },{
                nickname: 'ana.sousa',
                comment: 'podia melhorar'
            }]
        },
        {
            id: Math.random(),
            nickname: 'Werlen.santos',
            email: 'werle@gmail.com',
            image: require('../../assets/imgs/bw.jpg'),
            comments: []
        }
    ])

    return(
        <View style={styles.container}>
            <Header/>
            <FlatList
                data={posts}
                keyExtractor={item => `${item.id}`}
                renderItem={({item}) => 
                <Post key={item.id} {...item}/>}
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
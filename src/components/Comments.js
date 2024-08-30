import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Comments = ({comments}) => {
    return (
        <View style={styles.container}>
            {comments && comments.length > 0 ? (
                comments.map((item, index) => {
                    return (
                        <View style={styles.commentContainer} key={index}>
                            <Text style={styles.nickname}>{item.nickname}: </Text>
                            <Text style={styles.comment}>{item.comment}</Text>
                        </View>
                    );
                })
            ) : (
                <Text style={styles.noComments}>Sem comentários</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    commentContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    nickname: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: "#444"
    },
    comment: {
        color: '#000'
    }
})

export default Comments;
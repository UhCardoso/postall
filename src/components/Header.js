import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Platform, Image} from 'react-native';
import {Gravatar} from 'react-native-gravatar';

import icon from '../../assets/imgs/icon.png';

function Header() {
    const name = useSelector((state) => state.user.name) || 'Deslogado';
    const email = useSelector((state) => state.user.email);
    const gravatar = email ? <Gravatar options={{email: email, secure: true}} style={styles.avatar} /> : null;

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Image source={icon} style={styles.image} />
                <Text style={styles.title}>Postall</Text>
            </View>
            <View style={styles.userContainer}>
                <Text style={styles.user}>{name}</Text>
                {gravatar}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: Platform.OS === 'ios' ? 20 :0,
        padding: 10,
        borderBottomWidth: 1,
        borderBlockColor: '#bbb',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    image: {
        height: 30,
        width: 30,
        resizeMode: 'center'
    },
    title: {
        color: '#000',
        fontFamily: 'shelter',
        height: 25,
        fontSize: 28,
        lineHeight: 28
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    user: {
        fontSize: 10,
        color: '#888'
    },
    avatar: {
        width: 30,
        height: 30,
        marginLeft: 10
    }
})

export default Header;
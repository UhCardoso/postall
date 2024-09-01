import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Importando os hooks useSelector e useDispatch
import { logout } from "../store/actions/user"; // Ação de logout
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gravatar } from 'react-native-gravatar';

const Profile = ({ navigation }) => {
    // Usando useSelector para acessar o estado global
    const email = useSelector((state) => state.user.email);
    const name = useSelector((state) => state.user.name);

    // Usando useDispatch para criar a função de logout
    const dispatch = useDispatch();

    // Configuração inicial do Gravatar usando o email do estado global
    const [options, setOptions] = useState({
        email: email,
        secure: true
    });

    function handleLogout() {
        dispatch(logout()); // Disparando a ação de logout
        navigation.navigate('auth'); // Navegando para a tela de autenticação após o logout
    }

    return (
        <View style={styles.container}>
            <Gravatar options={options} style={styles.avatar} />
            <Text style={styles.nickname}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100
    },
    nickname: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },
    email: {
        marginTop: 20,
        fontSize: 25
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    }
});

export default Profile;

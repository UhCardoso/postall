import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux"; // Importando useDispatch para disparar ações
import { login } from "../store/actions/user"; // Importando a ação de login

const Login = ({ navigation }) => {
    const [name, setName] = useState('Luiz teste');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Usando useDispatch para criar a função de login
    const dispatch = useDispatch();

    function handleLogin() {
        dispatch(login({ name, email, password })); // Disparando a ação de login com os dados do usuário
        navigation.navigate('profileView'); // Navegando para a tela de perfil após o login
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                style={styles.input}
                autoFocus={true}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Senha"
                style={styles.input}
                autoFocus={true}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttomText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('register')} style={styles.button}>
                <Text style={styles.buttomText}>Criar nova conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: "#fff"
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#eee',
        height: 40,
        borderWidth: 1,
        borderColor: '#333'
    }
});

export default Login;

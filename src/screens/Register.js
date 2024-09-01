import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View>
            <TextInput style={styles.input} placeholder="Nome" autoFocus={true} value={name} onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
            <TextInput style={styles.input} placeholder="senha" value={password} onChangeText={setPassword} secureTextEntry={true}/>
            <TouchableOpacity onPress={()=>{}} style={styles.buttom}>
                <Text style={styles.buttomText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttom: {
        width: 100,
        margin: 'auto',
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        width: 'auto'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#eee',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15,
        margin: 'auto',
    }

})

export default Register;

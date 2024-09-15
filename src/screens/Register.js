import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { createUser } from "../store/actions/user";
import CountryPicker from 'react-native-country-picker-modal';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const Register = ({navigation}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countryCode, setCountryCode] = useState('BR'); // Código do país padrão (Brasil)
    const [callingCode, setCallingCode] = useState('55'); // Código de discagem padrão (Brasil)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true); // Validação do número

    function handleRegister() {
        console.log('phone');
        console.log(callingCode);
        console.log(phoneNumber)
        console.log('---phone-----')
       // dispatch(createUser({ name, email, password })); // Disparando a ação de login com os dados do usuário
        navigation.navigate('profileView'); // Navegando para a tela de perfil após o login
    }

    const handlePhoneNumberChange = (text) => {
        // Remover qualquer DDI antes de aplicar o novo formato
        const rawPhoneNumber = text.replace(`+${callingCode}`, '').trim();

        // Gerar o número de telefone com o DDI, mas sem adicionar duas vezes o DDI
        const phoneNumberInstance = parsePhoneNumberFromString(`+${callingCode}${rawPhoneNumber}`);
        if (phoneNumberInstance && phoneNumberInstance.isValid()) {
            // Definir o telefone formatado sem duplicar o DDI
            setPhoneNumber(phoneNumberInstance.formatInternational().replace(`+${callingCode} `, ''));
            setIsValid(true);
        } else {
            // Se não for válido, exibir o texto conforme está
            setPhoneNumber(text);
            setIsValid(false);
        }
      };

    return(
        <View>
            <TextInput style={styles.input} placeholder="Nome" autoFocus={true} value={name} onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
            <View style={[styles.countryPicker, { borderColor: isValid ? '#333' : 'red' }]}>
            <CountryPicker
                withFlag
                withCallingCode
                withFilter
                countryCode={countryCode}
                countryCodes={['BR', 'US', 'CA', 'GB', 'DE']}  // Lista dos países permitidos
                onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                }}
                />
                <Text style={styles.callingCode}>+{callingCode}</Text>
                <TextInput
                    style={styles.phoneInput}
                    placeholder="Digite o número de telefone"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                />
            </View>

            <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry={true}/>
            <TouchableOpacity
                onPress={handleRegister} 
                style={styles.buttom}>
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
    },
    countryPicker: {
        flexDirection: 'row',
        marginTop: 20,
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15,
        margin: 'auto',
        alignItems: 'center', // Centraliza verticalmente
        gap: 10,
    },
    phoneInput: {
        flex: 1, // Ocupa o espaço restante
        height: '100%', // Garante que o input ocupe toda a altura do contêiner
        paddingVertical: 0, // Remove o padding vertical extra
        paddingLeft: 10, // Espaço entre o código do país e o input
        fontSize: 16, // Ajusta o tamanho da fonte se necessário
    },
    callingCode: {
        fontSize: 16, // Garante que o texto tenha o mesmo tamanho da fonte
    }
});

export default Register;

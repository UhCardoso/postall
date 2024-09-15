import { createAsyncThunk } from '@reduxjs/toolkit';
import { CREATE_USER, LOGIN_USER } from '../actionsTypes/users';
import { userLoggedIn, userLoggedOut } from '../reducers/user';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// Ação de logout utilizando o action creator gerado automaticamente
export const logout = () => userLoggedOut();

export const createUser = createAsyncThunk(
    CREATE_USER,
    async (payload, { rejectWithValue }) => {
      try {
        console.log('Payload:', payload);
  
        // Criar o usuário no Firebase Auth com email e senha
        const userCredential = await auth().createUserWithEmailAndPassword(
          payload.email,
          payload.password
        );
  
        const { uid } = userCredential.user; // UID gerado para o usuário no Firebase Authentication
        
        console.log("nomeee")
        console.log(payload.name)
        // Verifique se o UID foi gerado e faça a gravação no Realtime Database
        if (uid) {
          await database()
            .ref(`/users/${uid}`)
            .set({
              name: payload.name,
              email: payload.email,
            });
        }
  
        console.log('Usuário criado e salvo no Realtime Database com sucesso');
  
      } catch (err) {
        console.error('Erro ao criar o usuário:', err);
        // Retorna a mensagem de erro caso a criação falhe
        return rejectWithValue(err.message || 'Erro ao se autenticar');
      }
    }
  );

  export const loginUser = createAsyncThunk(
    LOGIN_USER,
    async (payload, { rejectWithValue }) => {
      try {
        // Fazendo login com email e senha usando Firebase Authentication
        const userCredential = await auth().signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
  
        const user = userCredential.user;
  
        // Obtendo o token JWT (ID token)
        const token = await user.getIdToken();
  
        // Buscando o nome do usuário no Realtime Database usando o UID
        const userSnapshot = await database().ref(`/users/${user.uid}`).once('value');
        const userData = userSnapshot.val(); // Dados do usuário, incluindo o nome
  
        // Verificando se o nome foi encontrado
        const userName = userData?.name || null;

        console.log(userData);
  
        // Retornando apenas dados serializáveis do usuário, o token JWT e o nome
        return {
          id: user.uid,
          /*email: user.email,
          displayName: user.displayName || userName, // Usar o nome do Realtime Database, se disponível
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          token: token,  // Retornando o token JWT*/
          name: userName, // Retornando o nome obtido do Realtime Database
          password: null,
        };
  
      } catch (err) {
        // Caso haja algum erro no login, retornamos a mensagem
        return rejectWithValue(err.message || 'Erro ao fazer login');
      }
    }
  );

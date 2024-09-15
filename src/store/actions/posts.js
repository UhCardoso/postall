import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    ADD_COMMENT,
    ADD_POST,
    FETCH_POSTS,
} from '../actionsTypes/posts';

// Ação para adicionar um post com upload de imagem
export const addPost = createAsyncThunk(
  ADD_POST,
  async (post, { dispatch, getState, rejectWithValue }) => {
    try {
      const uploadResponse = await axios({
        baseURL: 'https://uploadimage-5em7gf3wlq-uc.a.run.app',
        method: 'post',
        data: {
          image: post.image.base64
        }
      });

      /* caso utilizasse token para usar a rota 
      // Acessando o token do estado
      const state = getState();
      const token = state.auth.token; // Supondo que o token esteja no auth do state

      const uploadResponse = await axios({
        baseURL: 'https://uploadimage-5em7gf3wlq-uc.a.run.app',
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}` // Usando o token no cabeçalho
        },
        data: {
          image: post.image.base64
        }
      });*/
      post.image = uploadResponse.data.imageUrl;
      
      await axios.post('/posts.json', { ...post });

      dispatch(fetchPosts());
      
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  }
);

// Ação para adicionar um comentário
export const addComment = createAsyncThunk(
    ADD_COMMENT,
    async (payload, { dispatch, rejectWithValue }) => {
      try {
        // Primeiro, busca os comentários existentes do post
        const response = await axios.get(`/posts/${payload.postId}.json`);
        const comments = response.data.comments || [];
  
        // Adiciona o novo comentário ao array de comentários
        comments.push(payload.comment);
  
        // Atualiza o post com o novo array de comentários
        await axios.patch(`/posts/${payload.postId}.json`, { comments });
  
        // Dispara a ação para buscar os posts atualizados
        dispatch(fetchPosts());
      } catch (err) {
        console.error(err);
        return rejectWithValue(err.response?.data || 'Erro ao adicionar comentário');
      }
    }
  );

// Ação para buscar as postagens do servidor (Firebase)
export const fetchPosts = createAsyncThunk(
    FETCH_POSTS,
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('/posts.json');
        const rawPosts = response.data;
        const posts = Object.keys(rawPosts).map(key => ({
          ...rawPosts[key],
          id: key
        }));

        console.log(response.response)
    
        return posts.reverse(); // Retorna os posts, em vez de despachar diretamente
      } catch (err) {
        console.error(err);
        return rejectWithValue(err.response.data);
      }
    }
  );
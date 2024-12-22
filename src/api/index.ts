import {Api} from './API';

export const api = new Api({
    baseURL: '/api',
})




export const logoutFromApi = async () => {
    try {
      const response = await api.users.usersLogoutCreate();
      console.log("Logout successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };


export const loginToApi = async (credentials: { username: string; password: string }) => {
  try {
    const response = await api.users.usersLoginCreate(credentials); // Убираем `data`
    console.log("Login successful:", response.data);
    return response.data; // Вернём данные, включая токен и информацию о пользователе
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Бросаем ошибку для обработки
  }
};


import { createAsyncThunk } from '@reduxjs/toolkit';
import { T_Topic } from 'src/modules/types.ts'; // Убедитесь, что вы импортировали правильный тип для тем

interface TopicsResponse {
  topics: T_Topic[];
  topics_count: number;
  draft_show_id: number; // Ваш тип T_Topic
  // другие поля, если необходимо
}

// Создаем асинхронный экшен
export const fetchTopicsByQuery = createAsyncThunk<TopicsResponse, string>(
  'topics/fetchByQuery',
  async (query) => {
      const response = await api.topics.topicsSearchList({
          query: query.toLowerCase(),
      });
      console.log(response.data, "eghfbwrsb")
      return response.data; // Возвращаем всю структуру response.data
  }
); 

import { UserLogin, Show } from 'src/api/API.ts';
export const userLogin = createAsyncThunk<UserLogin, { username: string; password: string }>(
  'users/login',
  async ({ username, password }) => {
      // Отправка запроса на авторизацию
      const response = await api.users.usersLoginCreate({ username, password });
      return response.data; // Возвращаем данные из ответа
  }
);


import { UserRegister } from 'src/api/API.ts';
export const userRegister = createAsyncThunk<UserRegister>(
  'users/register',
  async (userData) => {
      // Отправляем запрос на регистрацию
      const response = await api.users.usersRegisterCreate(userData);
      return response.data; // Возвращаем данные из ответа
  }
);


// src/core/api/topicApi.ts

import { TopicMocks } from 'src/modules/mocks.ts';

export const fetchTopicData = async (id: string): Promise<T_Topic | null> => {
  try {
    const response = await fetch(`/api/topics/${id}`, { signal: AbortSignal.timeout(1000) });
    if (!response.ok) {
      throw new Error('Failed to fetch topic');
    }
    const data: T_Topic = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching topic:', error);
    // Возвращаем mock-данные, если запрос не удался
    const mockTopic = TopicMocks.find(topic => topic?.topic_id === parseInt(id));
    return mockTopic || null;
  }
};


// Обновление данных шоу
export const updateShowDetails = createAsyncThunk<void, { showId: number, showData: Show }>(
  'shows/updateDetails',
  async ({ showId, showData }) => {
    // Отправка запроса на сервер для обновления данных шоу
    await api.shows.showsUpdateUpdate(showId, showData);
    await api.shows.showsUpdateStatusUserUpdate(showId);
  }
);


export const deleteShow = createAsyncThunk<void, number>(
  'shows/deleteShow',
  async (showId) => {
    // Отправка запроса на сервер для удаления шоу
    await api.shows.showsDeleteDelete(showId);
    await api.shows.showsUpdateStatusUserUpdate(showId);

  }
);

// Удаление темы из шоу
export const deleteTopicFromShow = createAsyncThunk<void, { showId: number, topicId: number }>(
  'shows/deleteTopic',
  async ({ showId, topicId }) => {
    // Отправка запроса на сервер для удаления темы из шоу
    await api.shows.showsDeleteTopicDelete(showId, topicId.toString());
  }
);

export const addTopicToShow = createAsyncThunk<void, number>(
  'shows/addTopicToShow',
  async (topicId: number) => {
    // Отправка запроса на сервер для добавления темы в шоу
    await api.topics.topicsAddToShowCreate(topicId);
  }
);
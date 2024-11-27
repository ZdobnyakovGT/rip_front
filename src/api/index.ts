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


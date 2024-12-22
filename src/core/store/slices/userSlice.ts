import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { loginToApi, logoutFromApi } from "src/api";
import { createAsyncThunk } from '@reduxjs/toolkit';


interface UserState {
  isAuth: boolean;
  login: string;
}

const getCookie = (): string | null => {
  const cookie = document.cookie.split(";").find((row) => row.trim().startsWith("session_id="));
  return cookie ? cookie.split("=")[1] : null;
};

const sessionToken = getCookie();

const initialState: UserState = {
  isAuth: !!sessionToken, // Пользователь авторизован, если есть токен
  login: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuth = false;
      state.login = "";
      document.cookie = "session_id=; Max-Age=0"; // Удаляем куки
    },
    saveUser: (state, action: PayloadAction<{ login: string }>) => {
      state.isAuth = true;
      state.login = action.payload.login;
    },
    resetUserState: () => initialState, // Сбрасываем состояние до начального
  },
});

export const { saveUser, logoutUser, resetUserState } = userAuthSlice.actions;

// Асинхронный экшен для проверки сессии


export const checkUserSession = () => async (dispatch: AppDispatch) => {
  const token = getCookie(); // Получаем токен сессии
  if (!token) {
    dispatch(logoutUser()); // Если токена нет, вызываем выход
    return;
  }

  try {
    const response = await loginToApi({ token });
    dispatch(saveUser({ login: response.login })); // Сохраняем данные пользователя
  } catch (error) {
    console.error("Ошибка проверки сессии:", error);
    dispatch(logoutUser()); // Если произошла ошибка, выходим
  }
};

// Асинхронный экшен для выхода
// export const logoutUserAsync = () => async (dispatch: AppDispatch) => {
//   try {
//     await logoutFromApi();
//     dispatch(logoutUser());
//   } catch (error) {
//     console.error("Ошибка при выходе:", error);
//   }
// };
export const logoutUserAsync = createAsyncThunk(
  "user/logout", 
  async (_, { rejectWithValue }) => {
    try {
      await logoutFromApi(); // Запрос на логаут с сервера
      document.cookie = "session_id=; Max-Age=0"; // Удаляем cookie с сессией
      return; // Возвращаем пустой результат при успешном выходе
    } catch (error) {
      return rejectWithValue("Ошибка при выходе из системы");
    }
  }
);
 

// import { updateUser } from "src/utils/utils.ts";

// export const updateUserData =
//   (userId: number, data: { login?: string; password?: string }) => async (dispatch: AppDispatch) => {
//     try {
//       const response = await updateUser(userId, data);
//       if (response.login) {
//         dispatch(saveUser({ login: response.login })); // Обновляем логин в состоянии
//       }
//       console.log("User data updated successfully.");
//     } catch (error) {
//       console.error("Ошибка при обновлении данных пользователя:", error, userId);
//     }
//   };

import { updateUser } from 'src/utils/utils.ts';

export const updateUserDataAsync = createAsyncThunk(
  "user/update",
  async ({ userId, data }: { userId: number; data: { login?: string; password?: string } }, { rejectWithValue }) => {
    try {
      const response = await updateUser(userId, data);
      if (response.login) {
        return { login: response.login }; // Возвращаем логин, если он есть
      }
      return;
    } catch (error) {
      return rejectWithValue("Ошибка при обновлении данных пользователя");
    }
  }
);

// Селекторы
export const selectIsAuth = (state: { userAuth: UserState }) => state.userAuth.isAuth;
export const selectLogin = (state: { userAuth: UserState }) => state.userAuth.login;

export default userAuthSlice.reducer;
export type { UserState };

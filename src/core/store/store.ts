import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import userAuthReducer from "./slices/userSlice";
import cookieReducer from "src/core/store/slices/cookSlise.ts"


export const store = configureStore({
  reducer: {
    search: searchReducer,
    userAuth: userAuthReducer,
    cookie: cookieReducer,

  },
});

// store.dispatch(checkUserSession()); // Проверяем сессию при загрузке

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

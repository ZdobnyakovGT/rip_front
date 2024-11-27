// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { Api } from "/Users/Fedor/Desktop/mypoopy/src/api/API.ts";

// export const loginUser = createAsyncThunk("auth/login", async (data) => {
//   const response = await Api.users.usersLoginCreate(data);
//   return response.data;
// });

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: { isAuthenticated: false, user: null },
//   reducers: {
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

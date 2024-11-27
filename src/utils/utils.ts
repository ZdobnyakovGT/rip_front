export const isHomePage = (path:string) => {
	return path == "/"
}

export const isTopicPage = (path:string) => {
    return path.match(/^\/topics\/(\d+)/)
}



// utils/cookies.ts
export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : null;
  };


import { api } from "src/api";

export const updateUser = async (userId: number, data: { username?: string; password?: string }) => {
  try {
    const response = await api.users.usersUpdateUpdate(userId, data);
    console.log("User updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

  
// import { api } from "src/api";
// import {User} from "src/api/API.ts"

// export const updateUser = async (
//     userId: number,
//     data: Partial<Pick<User, "username" | "password">> // Берем только необходимые поля
//   ) => {
//     try {
//       const response = await api.users.usersUpdateUpdate(userId, data); // Приводим userId к строке
//       console.log("User updated successfully:", response);
//       return response;
//     } catch (error) {
//       console.error("Error updating user data:", error);
//       throw error;
//     }
//   };
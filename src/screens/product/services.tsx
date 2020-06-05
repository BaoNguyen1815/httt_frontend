import { postService } from "services/config";

export const checkLogin = async (username: string, password: string) => {
  try {
    const body = {
      username,
      password
    };
    const response = await postService("login", body, false, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

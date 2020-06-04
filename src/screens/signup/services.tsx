import { postService } from "services/config";
export const signUp = async (username: string, password: string, fullName: string, role: string) => {
  try {
    const body = {
      username,
      password,
      fullName,
      role
    };
    const response = await postService("account/add", body, false, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

import { getService } from "services/config";

export const getAllUsers = async () => {
  try {
    const response = await getService("account", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

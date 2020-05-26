import { getService } from "services/config";

export const getAllCategory = async () => {
  try {
    const response = await getService("category", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

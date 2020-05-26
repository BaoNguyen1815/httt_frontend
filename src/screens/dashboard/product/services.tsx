import { getService } from "services/config";

export const getAllProduct = async () => {
  try {
    const response = await getService("product", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

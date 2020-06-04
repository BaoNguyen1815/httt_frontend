import { getService } from "services/config";

export const getAllOrder = async () => {
  try {
    const response = await getService("order", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

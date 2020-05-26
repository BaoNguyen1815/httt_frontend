import { getService } from "services/config";

export const getAllOrder = async () => {
  try {
    const response = await getService("order-detail", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

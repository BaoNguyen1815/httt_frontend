import { getService } from "services/config";

export const getAllCustomers = async () => {
  try {
    const response = await getService("customer", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

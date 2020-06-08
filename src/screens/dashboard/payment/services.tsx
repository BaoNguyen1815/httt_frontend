import { getService, postService } from "services/config";

export const getAllPayments = async () => {
  try {
    const response = await getService("payment", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewPayment = async (method: string, ownerName: string, ownerCardNumber: string) => {
  try {
    const response = await postService("payment/add", { method, ownerName, ownerCardNumber }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editPayment = async (id: number, method: string, ownerName: string, ownerCardNumber: string) => {
  try {
    const response = await postService("payment/update", { id, method, ownerName, ownerCardNumber }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deletePayment = async (id: number) => {
  try {
    const response = await postService("payment/delete", { id }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

import { getService, postService } from "services/config";

export const getAllShippings = async () => {
  try {
    const response = await getService("shipping", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewShipping = async (type: string, cost: number) => {
  try {
    const response = await postService("shipping/add", { type, cost }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editShipping = async (id: number, type: string, cost: number) => {
  try {
    const response = await postService("shipping/update", { id, type, cost }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteShipping = async (id: number) => {
  try {
    const response = await postService("shipping/delete", { id }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

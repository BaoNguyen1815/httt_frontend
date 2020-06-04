import { getService, postService } from "services/config";

export const getAllItems = async () => {
  try {
    const response = await getService("item", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewItem = async (sale: number, sellingPrice: number, productId: number) => {
  try {
    const response = await postService("item/add", { sale, sellingPrice, productId }, false, false);
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};

export const editItem = async (id: number, sale: number, sellingPrice: number, productId: number) => {
  try {
    const response = await postService("item/update", { id, sale, sellingPrice, productId }, false, false);
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteItem = async (id: number) => {
  try {
    const response = await postService("item/delete", { id }, false, false);
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};

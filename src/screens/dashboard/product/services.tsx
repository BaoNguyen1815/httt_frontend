import { getService, postService } from "services/config";

export const getAllProduct = async () => {
  try {
    const response = await getService("product", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewProduct = async (
  name: string,
  code: string,
  description: string,
  quantity: number,
  price: number,
  author: string,
  publisher: string,
  categoryId: number
) => {
  try {
    const response = await postService(
      "product/add",
      { name, code, description, quantity, price, author, publisher, categoryId },
      false,
      false
    );
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};

export const editProduct = async (
  id: number,
  name: string,
  code: string,
  description: string,
  quantity: number,
  price: number,
  author: string,
  publisher: string,
  categoryId: number
) => {
  try {
    const response = await postService(
      "product/update",
      { id, name, code, description, quantity, price, author, publisher, categoryId },
      false,
      false
    );
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteProduct = async (id: number) => {
  try {
    const response = await postService("product/delete", { id }, false, false);
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};

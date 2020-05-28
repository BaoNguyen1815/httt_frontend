import { getService, postService } from "services/config";

export const getAllCategory = async () => {
  try {
    const response = await getService("category", null, false, false);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewCategory = async (name: string, description: string) => {
  try {
    const response = await postService("category/add", { name, description }, false, false);
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};

export const editCategory = async (id: number, name: string, description: string) => {
  try {
    const response = await postService("category/update", { id, name, description }, false, false);
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteCategory = async (id: number) => {
  try {
    const response = await postService("category/delete", { id }, false, false);
    console.log(response, "res");
    return response;
  } catch (error) {
    throw error;
  }
};

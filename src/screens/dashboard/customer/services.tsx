import { getService, postService } from "services/config";

export const getAllCustomers = async () => {
  try {
    const response = await getService("customer", null, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewCustomer = async (
  name: string,
  phone: string,
  age: number,
  sex: string,
  username: string,
  password: string
) => {
  try {
    const response = await postService("customer/add", { name, phone, age, sex, username, password }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editCustomer = async (
  id: number,
  name: string,
  phone: string,
  age: number,
  sex: string,
  username: string,
  password: string
) => {
  try {
    const response = await postService(
      "customer/update",
      { id, name, phone, age, sex, username, password },
      false,
      false
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteCustomer = async (id: number) => {
  try {
    const response = await postService("customer/delete", { id }, false, false);
    return response;
  } catch (error) {
    throw error;
  }
};

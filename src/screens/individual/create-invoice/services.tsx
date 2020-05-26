import config from "containers/config";
import { postService } from "services/config";

export const sendInvoice = async (obj) => {
  try {
    //TODO: chang api endpoint
    return await postService(`${config.STAGE}/user/employers/view`, obj, "get list Employers Fail", true);
  } catch (error) {
    throw error;
  }
};
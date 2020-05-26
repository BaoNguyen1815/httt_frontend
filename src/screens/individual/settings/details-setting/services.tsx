import config from "containers/config";
import { postService } from "services/config";
export const submitDetail = async (email, phoneNumber, fname, lname, birthDay, street, city, postalCode) => {
  try {
    return await postService(
      `${config.STAGE}/user/submitDetail`,
      { email, phoneNumber, fname, lname, birthDay, street, city, postalCode },
      "Submit Detail Fail",
      false
    );
  } catch (error) {
    throw error;
  }
};

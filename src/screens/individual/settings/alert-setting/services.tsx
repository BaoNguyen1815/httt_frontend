import { postService } from "services/config";
import config from "containers/config";

export const alertBasic = async user_id => {
  try {
    return await postService(`${config.STAGE}/user/alerts/basic`, { user_id }, "Alert Fail", true);
  } catch (error) {
    throw error;
  }
};

export const alertEmailPreference = async (user_id, blockemailloginfromnewipaddress) => {
  try {
    return await postService(
      `${config.STAGE}/user/alerts/emailpreference/edit`,
      { user_id, blockemailloginfromnewipaddress },
      "Alert Email Fail",
      true
    );
  } catch (error) {
    throw error;
  }
};

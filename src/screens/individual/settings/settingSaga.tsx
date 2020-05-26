
import settingPageSaga from "./ducks/operations";
import verificationTabSaga from "./verification-setting/ducks/operations";
import securityTabSaga from "./security-setting/duck/operations";
export default {
  ...verificationTabSaga,
  ...settingPageSaga,
  ...securityTabSaga
};

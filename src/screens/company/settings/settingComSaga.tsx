
import settingPageSaga from "./ducks/operations";
import securityTabSaga from "./security-setting/duck/operations";
export default {
  ...settingPageSaga,
  ...securityTabSaga
};

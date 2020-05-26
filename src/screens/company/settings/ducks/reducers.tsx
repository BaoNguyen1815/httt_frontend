import { handleActions } from "redux-actions";
import { getCopProfileAction, editUserAction, setUserSecurityAction, setAlertAction, setUserAlertsHistory, setUserSessionHistory } from "./actions";

export default handleActions<any>(
  {
    [getCopProfileAction.toString()]: (state, { payload }) => ({ ...state, userDetail: payload }),
    [editUserAction.toString()]: (state, { payload }) => ({ ...state, userDetail: payload }),
    [setUserSecurityAction.toString()]: (state, { payload }) => ({ ...state, userSecurity: payload }),
    [setAlertAction.toString()]: (state, { payload }) => ({ ...state, alertDetails: payload }),
    [setUserAlertsHistory.toString()]: (state, { payload }) => ({ ...state, alertHistory: payload }),
    [setUserSessionHistory.toString()]: (state, { payload }) => ({ ...state, sessionHistory: payload })
  },
  {
    userDetail: {
      first_name: null,
      last_name: null,
      date_of_birth: null,
      street_address: null,
      city: null,
      state: null,
      zip: null,
      country: null
    },
    alertDetails: null,
    alertHistory: null,
    sessionHistory: null,

  }
);

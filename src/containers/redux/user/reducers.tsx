import { handleActions } from "redux-actions";
import { invalidTokenAction, setUserAction, setUserDetailAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState>(
  {
    [setUserAction.toString()]: (state, { payload }) => ({
      ...state,
      userInfo: payload
    }),
    [invalidTokenAction.toString()]: state => ({ ...state, tokenIsValid: false }),
    [setUserDetailAction.toString()]: (state, { payload }) => ({ ...state, userDetail: payload })
  },
  {
    userInfo: {
      username: null,
      uuid: null,
      user_id: null,
      apikey: null,
      apisecret: null,
      role: null
    },
    userDetail: {
      access_apps: false,
      approved: false,
      bitwage_role: "",
      city: "",
      country: "",
      current_ip: "",
      date_of_birth: "",
      default_company: "",
      default_employer: "",
      default_worker: "",
      email: "",
      first_name: "",
      last_name: "",
      phone_country: "",
      phone_number: "",
      right_sidebar: "",
      state: "",
      street_address: "",
      user_id: "",
      usercompanies: null,
      zip: ""
    },
    type: null,
    error: false,
    tokenIsValid: true
  }
);

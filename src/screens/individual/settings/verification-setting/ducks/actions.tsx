// import { IUserModel } from "models";
import { createActions } from "redux-actions";

const actions = createActions({
  UPLOAD_DOCUMENT_TYPE_ACTION: (user_adv) => ({ user_adv }),
  GET_PROFILE_ADVANCE_ACTION: user_id => user_id,
  SET_USER_ADVANCE_ACTION: user_adv => user_adv,
  ADD_USER_ADVANCE_ACTION: user_adv => user_adv,
  ON_LOADING_ACTION: null,
  OFF_LOADING_ACTION: null,
});

export const {
  uploadDocumentTypeAction,
  getProfileAdvanceAction,
  setUserAdvanceAction,
  addUserAdvanceAction,
  onLoadingAction,
  offLoadingAction
} = actions;

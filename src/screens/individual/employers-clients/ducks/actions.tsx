import { createActions } from "redux-actions";

const actions = createActions({
  INDIVIDUAL_GET_EMPLOYERS_ACTION: user_id => ({ user_id }),
  INDIVIDUAL_GET_CLIENTS_ACTION: user_id => ({ user_id }),
  INDIVIDUAL_GET_BPI_CONTRACTS_ACTION: user_id => ({ user_id }),
  INDIVIDUAL_SET_BPI_CONTRACTS_ACTION: null,
  INDIVIDUAL_REMOVE_EMPLOYER_ACTION: (user_id, employer_id, hideModal) => ({ user_id, employer_id, hideModal }),
  INDIVIDUAL_REMOVE_CLIENT_ACTION: (user_id, client_id, hideModal) => ({ user_id, client_id, hideModal }),
  INDIVIDUAL_EDIT_CLIENT_ACTION: (clientDetail, callBack) => ({ clientDetail, callBack }),
  INDIVIDUAL_EDIT_EMPLOYER_ACTION: (employerDetail, callBack) => ({ employerDetail, callBack }),
  INDIVIDUAL_SET_EMPLOYERS_ACTION: null,
  INDIVIDUAL_SET_CLIENTS_ACTION: null,
  INDIVIDUAL_SET_CURRENT_CLIENT_ACTION: null,
});

export const {
  individualGetBpiContractsAction,
  individualSetBpiContractsAction,
  individualGetEmployersAction,
  individualGetClientsAction,
  individualRemoveClientAction,
  individualRemoveEmployerAction,
  individualEditClientAction,
  individualEditEmployerAction,
  individualSetEmployersAction,
  individualSetClientsAction,
  individualSetCurrentClientAction
} = actions;

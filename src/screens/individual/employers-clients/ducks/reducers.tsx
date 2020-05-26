import { handleActions } from "redux-actions";
import {
  individualSetClientsAction, individualSetEmployersAction, individualSetBpiContractsAction, individualSetCurrentClientAction
} from "./actions";

export default handleActions<any>(
  {
    [individualSetClientsAction.toString()]: (state, { payload }) => ({
      ...state,
      listClients: payload
    }),
    [individualSetEmployersAction.toString()]: (state, { payload }) => ({
      ...state,
      listEmployers: payload
    }),
    [individualSetBpiContractsAction.toString()]: (state, { payload }) => ({
      ...state,
      listBpiContracts: payload
    }),
    [individualSetCurrentClientAction.toString()]: (state, { payload }) => ({
      ...state,
      currentUser: payload
    })
  },
  {
    listClients: null,
    listEmployers: null,
    listBpiContracts: {
      employers: [],
      clients: []
    },
    currentUser: {}
  }
);

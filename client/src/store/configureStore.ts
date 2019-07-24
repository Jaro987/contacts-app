import { createStore } from "redux";
import AppState from "./state";

var _defaultState: AppState = {
  error: null,
  editing: false,
  contacts: []
};

function rootReducer(state: any, action: any) {
  state = state || _defaultState;
  switch (action.type) {
    case "CONTACTS_LOADED":
      state = Object.assign({}, state, { contacts: action.data });
      return state;
    case "CONTACTS_LOADING_FAILED":
      state = Object.assign({}, state, { error: action.data });
      return state;
    default:
      return state;
  }
}

var store = createStore(rootReducer);

export default store;

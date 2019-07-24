import Contact from "../contacts/data";

interface AppState {
  error: any;
  editing: boolean;
  contacts: Contact[];
}

export default AppState;

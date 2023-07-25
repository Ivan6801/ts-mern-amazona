/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useReducer } from "react";

type AppState = {
  mode: string;
};

const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};
type Action = { type: "SWITCH_MODE" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };

    default:
      return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const StoreContext = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
});
function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );
  return <StoreContext.Provider value={{ state, dispatch }} {...props} />;
}

export { StoreContext, StoreProvider };

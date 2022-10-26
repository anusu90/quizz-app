import {
  Dispatch,
  Reducer,
  ReducerAction,
  ReducerState,
  useEffect,
  useReducer,
} from "react";
import { GameStateModel } from "../models/game";
import { isBrowser } from "../utils/common";

const usePresistentReducer = <R extends Reducer<GameStateModel, any>>(
  reducer: R,
  initState: ReducerState<R>,
  key: string
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const serialize = JSON.stringify;
  const deserialize = JSON.parse;
  const [state, dispatch] = useReducer(reducer, initState, (init) => {
    const valueInLocalStorage = isBrowser() ? localStorage.getItem(key) : null;
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return init;
  });

  useEffect(() => {
    localStorage?.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, dispatch];
};

export default usePresistentReducer;

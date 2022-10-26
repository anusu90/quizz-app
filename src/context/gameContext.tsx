import React from "react";
import usePresistentReducer from "../hooks/use-persistant-reducer";
import { GameActions, GameStateModel } from "../models/game";
import GameReducer, { GameInitState } from "../reducer/game";

const GameStateContext = React.createContext<GameStateModel | undefined>(
  undefined
);
const GameDispatchContext = React.createContext<
  React.Dispatch<GameActions> | undefined
>(undefined);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = usePresistentReducer(
    GameReducer,
    GameInitState,
    "game"
  );

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

const useGameState = (): GameStateModel => {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error(
      "useProjectsState must be used within a GameContextProvider"
    );
  }
  return context;
};
const useGameDispatch = (): React.Dispatch<GameActions> => {
  const context = React.useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useProjectsState must be used within a GameContextProvider"
    );
  }
  return context;
};

export { GameContextProvider, useGameState, useGameDispatch };

import { GameActions, GameActionTypes, GameStateModel } from "../models/game";

export const GameInitState: GameStateModel = {
  currentQuestion: undefined,
  currentQuestionCount: 0,
  currentAnswer: "",
  isCurrentAnswered: false,
  isCurrentCorrect: undefined,
};

const GameReducer = (
  gameState: GameStateModel = GameInitState,
  action: GameActions
) => {
  switch (action.type) {
    case GameActionTypes.INPUT_ENTER: {
      return { ...gameState, ...action.payload };
    }
    case GameActionTypes.QUESTION_ANSWERED: {
      return { ...gameState, ...action.payload };
    }
    case GameActionTypes.NEW_QUESTION: {
      return { ...gameState, ...action.payload };
    }
  }
};

export default GameReducer;

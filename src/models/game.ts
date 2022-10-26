import { QuestionModel } from "./question";

export interface GameStateModel {
  currentQuestion: QuestionModel | undefined;
  currentQuestionCount: number;
  currentAnswer: string | number | undefined;
  isCurrentCorrect: boolean | undefined;
  isCurrentAnswered: boolean;
}

export enum GameActionTypes {
  INPUT_ENTER = "inputEnter",
  QUESTION_ANSWERED = "questionAnswered",
  NEW_QUESTION = "newQuestion",
}

export type GameActions =
  | {
      type: GameActionTypes.INPUT_ENTER;
      payload: Partial<GameStateModel>;
    }
  | {
      type: GameActionTypes.QUESTION_ANSWERED;
      payload: Partial<GameStateModel>;
    }
  | {
      type: GameActionTypes.NEW_QUESTION;
      payload: Partial<GameStateModel>;
    };

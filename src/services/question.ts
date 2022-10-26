import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useGameDispatch, useGameState } from "../context/gameContext";
import { GameActionTypes } from "../models/game";
import { QuestionResponseModel } from "../models/question";
import { getFirstIfArray } from "../utils/common";
const url = "https://opentdb.com/api.php?amount=1";

const useGetQuestion = (): [boolean, any] => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentQuestion } = useGameState();
  const gameDispatch = useGameDispatch();

  const fetchQuestion = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.request<QuestionResponseModel>({
      method: "GET",
      url: url,
    });
    gameDispatch({
      type: GameActionTypes.NEW_QUESTION,
      payload: { currentQuestion: getFirstIfArray(data?.results) },
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getInitRenderQuestion = async () => {
      await fetchQuestion();
    };
    if (!currentQuestion) {
      getInitRenderQuestion();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchQuestion]);
  return [isLoading, fetchQuestion];
};

export default useGetQuestion;

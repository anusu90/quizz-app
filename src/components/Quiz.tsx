import React, { useMemo } from "react";
import { useGameDispatch, useGameState } from "../context/gameContext";
import { GameActionTypes } from "../models/game";
import useGetQuestion from "../services/question";
import { shuffle } from "../utils/common";
import Button from "./common/button";
import Input from "./common/input";

const Quiz = () => {
  const [isLoading, fetchQuestion] = useGetQuestion();
  const {
    currentQuestionCount,
    currentAnswer,
    currentQuestion: quesData,
    isCurrentAnswered,
    isCurrentCorrect,
  } = useGameState();
  const gameDispatch = useGameDispatch();

  const {
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers = [],
  } = quesData ?? {};
  const shuffledOptions = useMemo(() => {
    const allOptions = [correctAnswer ?? "", ...incorrectAnswers] ?? [];
    return shuffle(allOptions);
  }, [correctAnswer, incorrectAnswers]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event?.target?.value ?? "";
    gameDispatch({
      type: GameActionTypes.INPUT_ENTER,
      payload: { currentAnswer: inputString },
    });
  };

  const handleAnswerSubmission = () => {
    let isCorrect = false;
    if (typeof currentAnswer === "string") {
      if (currentAnswer?.toLowerCase() === correctAnswer?.toLowerCase()) {
        isCorrect = true;
      } else {
        isCorrect = false;
      }
    } else {
      if (currentAnswer === correctAnswer) {
        isCorrect = true;
      } else {
        isCorrect = false;
      }
    }
    gameDispatch({
      type: GameActionTypes.QUESTION_ANSWERED,
      payload: { isCurrentAnswered: true, isCurrentCorrect: isCorrect },
    });
  };

  const getNewQuestion = () => {
    fetchQuestion();
    gameDispatch({
      type: GameActionTypes.INPUT_ENTER,
      payload: {
        currentAnswer: "",
        isCurrentAnswered: false,
        isCurrentCorrect: undefined,
        currentQuestionCount: currentQuestionCount + 1,
      },
    });
  };

  const renderQuestion = () => {
    if (isLoading && !quesData) {
      return <div className="h-64">Loading a question</div>;
    }
    return (
      <>
        <div className="mb-5">{question}</div>
        <ul className="list-decimal list-inside">
          {shuffledOptions.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
        <div className="my-5">
          <Input onChange={handleInput} value={currentAnswer} />
        </div>
      </>
    );
  };

  const renderResult = () => {
    if (isCurrentAnswered && isCurrentCorrect) {
      return (
        <div className="text-green-500">
          You have answered this question and your answer is correct
        </div>
      );
    }
    if (isCurrentAnswered && !isCurrentCorrect) {
      return (
        <div className="text-red-500">
          You have answered this question and your question is incorrect.
        </div>
      );
    }
    return <></>;
  };

  return (
    <div className="border rounded p-20 w-1/2 shadow-2xl">
      <div className="my-10 flex justify-between">
        <h2>Welcome</h2>
        <div>Count: {currentQuestionCount}</div>
      </div>
      <div>Your Question is:</div>
      {renderQuestion()}
      {renderResult()}
      <div className="flex mt-5">
        <Button
          buttonText="Submit"
          onClick={handleAnswerSubmission}
          loading={isLoading}
          disabled={isLoading || isCurrentAnswered}
        />
        <Button
          buttonText="Next Question"
          onClick={getNewQuestion}
          loading={isLoading}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Quiz;

/**
 * Even though the question contains other KWs we are concerned with these only
 */
export interface QuestionModel {
  correct_answer: string;
  question: string;
  incorrect_answers: string[];
}

export interface QuestionResponseModel {
  results: Array<QuestionModel>;
}

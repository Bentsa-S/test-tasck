import { QuestionType } from "./models/enums";

export class QuestionInput {
  title: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export class CreateFormInput {
  title: string;
  description?: string;
  questions: QuestionInput[];
}

export class AnswerInput {
  questionId: string;
  value: string | string[];
}

export class SubmitResponseInput {
  formId: string;
  answers: AnswerInput[];
}

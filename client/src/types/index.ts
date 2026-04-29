export const QuestionType = {
  TEXT: 'TEXT',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  CHECKBOX: 'CHECKBOX',
  DATE: 'DATE',
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];


export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: string;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface Response {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: string;
}

export interface CreateFormInput {
  title: string;
  description?: string;
  questions: Omit<Question, 'id'>[];
}

export interface SubmitResponseInput {
  formId: string;
  answers: Answer[];
}

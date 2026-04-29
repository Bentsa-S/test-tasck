import { QuestionType } from './enums';

export class Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

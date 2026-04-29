import { Answer } from './answer.model';

export class Response {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: string;
}

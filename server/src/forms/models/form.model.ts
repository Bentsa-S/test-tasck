import { Question } from "./question.model";

export class Form {
    id: string;
    title: string;
    description?: string;
    questions?: Question[];
}
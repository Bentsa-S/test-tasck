
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum QuestionType {
    TEXT = "TEXT",
    DATE = "DATE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    CHECKBOX = "CHECKBOX"
}

export interface QuestionInput {
    title: string;
    type: QuestionType;
    options?: Nullable<string[]>;
    required: boolean;
}

export interface CreateFormInput {
    title: string;
    description?: Nullable<string>;
    questions?: Nullable<QuestionInput[]>;
}

export interface AnswerInput {
    questionId: string;
    value?: Nullable<string[]>;
}

export interface SubmitResponseInput {
    formId: string;
    answers: AnswerInput[];
}

export interface Question {
    id: string;
    title: string;
    type: QuestionType;
    options?: Nullable<string[]>;
    required: boolean;
}

export interface Form {
    id: string;
    title: string;
    description?: Nullable<string>;
    questions?: Nullable<Question[]>;
}

export interface Answer {
    questionId: string;
    value?: Nullable<string[]>;
}

export interface Response {
    id: string;
    formId: string;
    answers: Answer[];
    submittedAt: string;
}

export interface IQuery {
    forms(): Form[] | Promise<Form[]>;
    form(id: string): Nullable<Form> | Promise<Nullable<Form>>;
    responses(formId: string): Response[] | Promise<Response[]>;
}

export interface IMutation {
    createForm(input: CreateFormInput): Form | Promise<Form>;
    submitResponse(input: SubmitResponseInput): Response | Promise<Response>;
    deleteForm(id: string): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;

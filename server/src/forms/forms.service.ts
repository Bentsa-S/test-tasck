import { Injectable } from "@nestjs/common";
import { Form } from "./models/form.model";
import { Response } from "./models/response.model";
import { CreateFormInput, SubmitResponseInput } from "./interfaces";
import { formsDb, responsesDb } from "../database/forms.data";

@Injectable()
export class FormsService {
    findAll(): Form[] {
        return formsDb;
    }

    findOne(id: string): Form | undefined {
        return formsDb.find(f => f.id === id);
    }

    createForm(input: CreateFormInput): Form {
        const newForm: Form = {
            id: Date.now().toString(),
            title: input.title,
            description: input.description,
            questions: input.questions?.map((q, index) => ({
                id: `q_${Date.now()}_${index}`,
                title: q.title,
                type: q.type,
                options: q.options,
                required: q.required
            })) || []
        };

        formsDb.push(newForm);
        return newForm;
    }

    findResponses(formId: string): Response[] {
        return responsesDb.filter(r => r.formId === formId);
    }

    submitResponse(input: SubmitResponseInput): Response {
        const newResponse: Response = {
            id: Date.now().toString(),
            formId: input.formId,
            answers: input.answers,
            submittedAt: new Date().toISOString()
        };
        responsesDb.push(newResponse);
        return newResponse;
    }

    deleteForm(id: string): boolean {
        const index = formsDb.findIndex(f => f.id === id);
        if (index !== -1) {
            formsDb.splice(index, 1);
            // Also delete responses
            for (let i = responsesDb.length - 1; i >= 0; i--) {
                if (responsesDb[i].formId === id) {
                    responsesDb.splice(i, 1);
                }
            }
            return true;
        }
        return false;
    }
}
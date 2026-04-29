import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { CreateFormInput, SubmitResponseInput } from './interfaces';

@Resolver()
export class FormsResolver {
    constructor(private formsService: FormsService) { }

    @Query()
    forms() {
        return this.formsService.findAll();
    }

    @Query()
    form(@Args('id') id: string) {
        return this.formsService.findOne(id);
    }

    @Query()
    responses(@Args('formId') formId: string) {
        return this.formsService.findResponses(formId);
    }

    @Mutation()
    createForm(@Args('input') input: CreateFormInput) {
        return this.formsService.createForm(input);
    }

    @Mutation()
    submitResponse(@Args('input') input: SubmitResponseInput) {
        return this.formsService.submitResponse(input);
    }

    @Mutation()
    deleteForm(@Args('id') id: string) {
        return this.formsService.deleteForm(id);
    }
}
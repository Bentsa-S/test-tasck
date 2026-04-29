import { z } from 'zod';
import { QuestionType } from '../types';

export const formSchema = z.object({
  title: z.string().min(1, 'Form title is required'),
  description: z.string().optional(),
  questions: z.array(z.object({
    title: z.string().min(1, 'Question title is required'),
    type: z.nativeEnum(QuestionType),
    required: z.boolean(),
    options: z.array(z.string().min(1, 'Option cannot be empty')).optional(),
  })).min(1, 'At least one question is required'),
});

export type FormSchema = z.infer<typeof formSchema>;

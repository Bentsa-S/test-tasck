import { useState, type FormEventHandler } from 'react';
import { useSubmitResponseMutation } from '../store/api';
import type { Answer, Form } from '../types';

export const useFormFiller = (formId: string, form?: Form) => {
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateAnswer = (qId: string, val: string | string[]) => setAnswers(p => ({ ...p, [qId]: val }));

  const updateCheck = (qId: string, opt: string, checked: boolean) => {
    const cur = (answers[qId] as string[]) || [];
    updateAnswer(qId, checked ? [...cur, opt] : cur.filter(o => o !== opt));
  };

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!form) return;
    const missing = form.questions.filter(q => q.required && !answers[q.id]);
    if (missing.length) return alert(`Required: ${missing.map(m => m.title).join(', ')}`);

    try {
      const formatted: Answer[] = Object.entries(answers).map(([questionId, value]) => ({ questionId, value }));
      await submitResponse({ formId, answers: formatted }).unwrap();
      setSubmitted(true);
    } catch (err) { console.error(err); }
  };

  return { answers, submitted, isSubmitting, updateAnswer, updateCheck, submit };
};

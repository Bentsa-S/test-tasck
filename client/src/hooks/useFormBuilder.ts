import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateFormMutation } from '../store/api';
import { QuestionType } from '../types';
import type { Question } from '../types';
import { formSchema } from '../lib/schemas';

export const useFormBuilder = () => {
  const navigate = useNavigate();
  const [createFormMutation, { isLoading }] = useCreateFormMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addQuestion = (type: QuestionType) => {
    setQuestions([...questions, {
      title: '',
      type,
      required: false,
      options: type === QuestionType.MULTIPLE_CHOICE || type === QuestionType.CHECKBOX ? ['Option 1'] : undefined
    }]);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.questions;
      return next;
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, updates: Partial<Omit<Question, 'id'>>) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    setQuestions(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const q = questions[qIndex];
    if (q.options) {
      updateQuestion(qIndex, { options: [...q.options, `Option ${q.options.length + 1}`] });
    }
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const q = questions[qIndex];
    if (q.options) {
      const newOptions = [...q.options];
      newOptions[oIndex] = value;
      updateQuestion(qIndex, { options: newOptions });
    }
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const q = questions[qIndex];
    if (q.options && q.options.length > 1) {
      updateQuestion(qIndex, { options: q.options.filter((_, i) => i !== oIndex) });
    }
  };

  const saveForm = async () => {
    setErrors({});
    const validation = formSchema.safeParse({ title, description, questions });

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        newErrors[path] = issue.message;
      });
      setErrors(newErrors);
      
      const firstError = Object.keys(newErrors)[0];
      if (firstError === 'title') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    try {
      await createFormMutation({ title, description, questions }).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return {
    meta: {
      title,
      setTitle,
      description,
      setDescription,
    },
    questions: {
      items: questions,
      add: addQuestion,
      remove: removeQuestion,
      update: updateQuestion,
      addOption,
      updateOption,
      removeOption,
    },
    submission: {
      errors,
      save: saveForm,
      isLoading,
    },
  };
};

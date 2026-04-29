import { useParams, useNavigate } from 'react-router-dom';
import { useGetFormQuery } from '../store/api';
import { Button, Card, Input, Container } from '../components/ui';
import { PageHeader } from '../components/shared';
import { QuestionType } from '../types';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFormFiller } from '../hooks/useFormFiller';

const FormFiller = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetFormQuery(id!);
  const { answers, submitted, isSubmitting, updateAnswer, updateCheck, submit } = useFormFiller(id!, data?.form);

  if (isLoading) return <div className="p-12 text-center text-slate-500">Loading form...</div>;
  if (error || !data) return <div className="p-12 text-center text-rose-500 font-medium">Form not found.</div>;

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Submission Received!</h1>
        <p className="text-slate-500 mb-12">Your response to "{data.form.title}" has been recorded. Thank you!</p>
        <Button variant="secondary" onClick={() => navigate('/')}>Return to Dashboard</Button>
      </motion.div>
    </div>
  );

  return (
    <Container className="max-w-3xl">
      <PageHeader showBack title={data.form.title} description={data.form.description} />
      <form onSubmit={submit} className="space-y-6 mb-12">
        {data.form.questions.map((q) => (
          <Card key={q.id} className="p-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">
              {q.title} {q.required && <span className="text-rose-500">*</span>}
            </h3>
            {q.type === QuestionType.TEXT && <Input placeholder="Your answer" value={(answers[q.id] as string) || ''} onChange={e => updateAnswer(q.id, e.target.value)} required={q.required} />}
            {q.type === QuestionType.DATE && <Input type="date" value={(answers[q.id] as string) || ''} onChange={e => updateAnswer(q.id, e.target.value)} required={q.required} />}
            {q.type === QuestionType.MULTIPLE_CHOICE && (
              <div className="space-y-4">
                {q.options?.map((opt, i) => (
                  <label key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="radio" name={q.id} className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" onChange={() => updateAnswer(q.id, opt)} required={q.required} />
                    <span className="text-slate-700 font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            )}
            {q.type === QuestionType.CHECKBOX && (
              <div className="space-y-4">
                {q.options?.map((opt, i) => (
                  <label key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" onChange={e => updateCheck(q.id, opt, e.target.checked)} />
                    <span className="text-slate-700 font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </Card>
        ))}
        <div className="flex justify-end pt-8"><Button type="submit" size="lg" isLoading={isSubmitting}>Submit Form</Button></div>
      </form>
    </Container>
  );
};

export default FormFiller;

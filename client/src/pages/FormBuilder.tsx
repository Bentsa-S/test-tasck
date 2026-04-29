import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Container } from '../components/ui';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { QuestionCard } from '../components/form/QuestionCard';
import { FormTitleCard } from '../components/form/FormTitleCard';
import { FormBuilderToolbar } from '../components/form/FormBuilderToolbar';

const FormBuilder = () => {
  const navigate = useNavigate();
  const { meta, questions, submission } = useFormBuilder();

  return (
    <Container className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Form</h1>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate('/')}>Cancel</Button>
          <Button onClick={submission.save} isLoading={submission.isLoading}>Save Form</Button>
        </div>
      </div>

      <FormTitleCard
        title={meta.title}
        setTitle={meta.setTitle}
        description={meta.description}
        setDescription={meta.setDescription}
        errors={submission.errors}
      />

      <div className="space-y-6 mb-12">
        {questions.items.map((q, qIdx) => (
          <QuestionCard
            key={qIdx}
            index={qIdx}
            question={q}
            errors={submission.errors}
            updateQuestion={questions.update}
            removeQuestion={questions.remove}
            addOption={questions.addOption}
            updateOption={questions.updateOption}
            removeOption={questions.removeOption}
          />
        ))}

        {submission.errors.questions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-4 bg-rose-50 rounded-2xl border border-rose-100 text-rose-600 font-medium"
          >
            {submission.errors.questions}
          </motion.div>
        )}
      </div>

      <FormBuilderToolbar onAddQuestion={questions.add} />
    </Container>
  );
};

export default FormBuilder;

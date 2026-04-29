import { Type, CheckCircle2, List, Calendar } from 'lucide-react';
import { Button } from '../ui';
import { QuestionType } from '../../types';

interface FormBuilderToolbarProps {
  onAddQuestion: (type: QuestionType) => void;
}

export const FormBuilderToolbar = ({ onAddQuestion }: FormBuilderToolbarProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sticky bottom-8 p-4 glass rounded-3xl shadow-2xl z-10">
    <Button variant="secondary" size="sm" onClick={() => onAddQuestion(QuestionType.TEXT)} className="gap-2">
      <Type className="w-4 h-4" /> Text
    </Button>
    <Button variant="secondary" size="sm" onClick={() => onAddQuestion(QuestionType.MULTIPLE_CHOICE)} className="gap-2">
      <CheckCircle2 className="w-4 h-4" /> Choice
    </Button>
    <Button variant="secondary" size="sm" onClick={() => onAddQuestion(QuestionType.CHECKBOX)} className="gap-2">
      <List className="w-4 h-4" /> Boxes
    </Button>
    <Button variant="secondary" size="sm" onClick={() => onAddQuestion(QuestionType.DATE)} className="gap-2">
      <Calendar className="w-4 h-4" /> Date
    </Button>
  </div>
);

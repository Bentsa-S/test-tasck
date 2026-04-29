import { motion } from 'framer-motion';
import { GripVertical, ChevronDown, Trash2, Plus } from 'lucide-react';
import { Card, Input, Button } from '../ui';
import { QuestionType } from '../../types';
import type { Question } from '../../types';

interface QuestionCardProps {
  question: Omit<Question, 'id'>;
  index: number;
  errors: Record<string, string>;
  updateQuestion: (index: number, updates: Partial<Omit<Question, 'id'>>) => void;
  removeQuestion: (index: number) => void;
  addOption: (index: number) => void;
  updateOption: (qIndex: number, oIndex: number, value: string) => void;
  removeOption: (qIndex: number, oIndex: number) => void;
}

export const QuestionCard = ({
  question,
  index,
  errors,
  updateQuestion,
  removeQuestion,
  addOption,
  updateOption,
  removeOption
}: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card className="relative group">
        <div className="flex items-start gap-4">
          <div className="mt-4 text-slate-300">
            <GripVertical className="w-5 h-5 cursor-grab" />
          </div>
          <div className="flex-1">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Question Title"
                  className={`text-lg font-medium ${errors[`questions.${index}.title`] ? 'border-rose-300 focus:ring-rose-500' : ''}`}
                  value={question.title}
                  onChange={(e) => updateQuestion(index, { title: e.target.value })}
                />
                {errors[`questions.${index}.title`] && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{errors[`questions.${index}.title`]}</p>
                )}
              </div>
              <div className="w-48 relative">
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white appearance-none outline-none"
                  value={question.type}
                  onChange={(e) => updateQuestion(index, { type: e.target.value as QuestionType })}
                >
                  <option value={QuestionType.TEXT}>Short Answer</option>
                  <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
                  <option value={QuestionType.CHECKBOX}>Checkboxes</option>
                  <option value={QuestionType.DATE}>Date</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {(question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.CHECKBOX) && (
              <div className="space-y-3 mb-6 ml-2">
                {question.options?.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-3">
                    {question.type === QuestionType.MULTIPLE_CHOICE ? (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                    ) : (
                      <div className="w-4 h-4 rounded border-2 border-slate-300" />
                    )}
                    <div className="flex-1">
                      <input
                        type="text"
                        className={`w-full text-slate-700 outline-none border-b py-1 transition-colors ${errors[`questions.${index}.options.${oIdx}`] ? 'border-rose-300 text-rose-500' : 'border-transparent focus:border-slate-200'}`}
                        value={opt}
                        onChange={(e) => updateOption(index, oIdx, e.target.value)}
                      />
                      {errors[`questions.${index}.options.${oIdx}`] && (
                        <p className="text-rose-500 text-[10px] font-medium">{errors[`questions.${index}.options.${oIdx}`]}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeOption(index, oIdx)}
                      className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(index)}
                  className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1 mt-2"
                >
                  <Plus className="w-4 h-4" /> Add Option
                </button>
              </div>
            )}

            {question.type === QuestionType.TEXT && (
              <div className="ml-2 mb-6 text-slate-400 italic text-sm">User will provide a short text response.</div>
            )}
            {question.type === QuestionType.DATE && (
              <div className="ml-2 mb-6 text-slate-400 italic text-sm">User will select a date.</div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`req-${index}`}
                  checked={question.required}
                  onChange={(e) => updateQuestion(index, { required: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={`req-${index}`} className="text-sm text-slate-600">Required</label>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeQuestion(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

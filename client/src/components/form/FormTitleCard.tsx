import { Card } from '../ui';

interface FormTitleCardProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  errors: Record<string, string>;
}

export const FormTitleCard = ({
  title,
  setTitle,
  description,
  setDescription,
  errors
}: FormTitleCardProps) => (
  <Card className="mb-8 p-8 border-t-8 border-t-indigo-600">
    <input
      type="text"
      placeholder="Form Title"
      className={`w-full text-4xl font-bold border-none outline-none mb-2 placeholder:text-slate-300 ${errors.title ? 'text-rose-500' : ''}`}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    {errors.title && <p className="text-rose-500 text-sm mb-4 font-medium">{errors.title}</p>}
    <textarea
      placeholder="Form Description"
      className="w-full text-lg border-none outline-none resize-none text-slate-500 placeholder:text-slate-300"
      rows={2}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </Card>
);

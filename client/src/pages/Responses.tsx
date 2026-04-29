import { Card, Container, Badge } from '../components/ui';
import { PageHeader, EmptyState } from '../components/shared';
import { Calendar, User, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { useResponses } from '../hooks/useResponses';

const Responses = () => {
  const { form, responses, isLoading } = useResponses();

  if (isLoading || !form) return <div className="p-12 text-center text-slate-500">Loading responses...</div>;

  return (
    <Container>
      <PageHeader
        showBack
        title={`Responses: ${form.title}`}
        description={`${responses.length} total responses received.`}
      />

      {responses.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="No responses yet"
          description="Share your form to start collecting data from your users!"
        />
      ) : (
        <div className="space-y-8">
          {responses.map((resp, idx) => (
            <Card key={resp.id} className="p-8 border-l-8 border-l-indigo-400 overflow-hidden relative">
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <User className="w-5 h-5" />
                  <span className="font-medium text-sm">Response #{responses.length - idx}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(resp.submittedAt), 'MMM d, yyyy h:mm a')}
                </div>
              </div>

              <div className="grid gap-8">
                {form.questions.map((q) => {
                  const answer = resp.answers.find(a => a.questionId === q.id);
                  return (
                    <div key={q.id}>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{q.title}</h4>
                      <div className="p-4 bg-slate-50 rounded-xl text-slate-800 font-medium border border-slate-100">
                        {answer ? (
                          Array.isArray(answer.value) ? (
                            <div className="flex flex-wrap gap-2">
                              {answer.value.map((v, i) => (
                                <Badge key={i} variant="indigo">
                                  {v}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            answer.value || <span className="text-slate-400 italic">No answer provided</span>
                          )
                        ) : (
                          <span className="text-slate-400 italic">No answer provided</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Responses;
"use client";

import { useState } from "react";
import { FilePlus, Trash2, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuizDashboardPage() {
  const router = useRouter();

  const [inProgressQuizzes, setInProgressQuizzes] = useState([
    {
      id: 1,
      name: 'Jul-09-2026 19:27:32',
      mode: 'Study mode',
      questions: 65,
    },
    {
      id: 2,
      name: 'Jul-10-2026 08:15:00',
      mode: 'Exam mode',
      questions: 120,
    }
  ]);

  const [quizToDelete, setQuizToDelete] = useState<{ id: number, type: 'in-progress' | 'completed', mode: string } | null>(null);

  const [completedQuizzes, setCompletedQuizzes] = useState([
    {
      id: 1,
      name: 'Jul-08-2026 10:15:00',
      mode: 'Exam mode',
      questions: 98,
      score: 75.5,
      incorrect: 24,
    },
    {
      id: 2,
      name: 'Jul-07-2026 14:30:22',
      mode: 'Study mode',
      questions: 50,
      score: 100,
      incorrect: 0,
    },
    {
      id: 3,
      name: 'Jul-05-2026 09:00:00',
      mode: 'Exam mode',
      questions: 120,
      score: 55.0,
      incorrect: 54,
    }
  ]);

  const deleteInProgress = (id: number) => {
    setInProgressQuizzes(inProgressQuizzes.filter(q => q.id !== id));
  };

  const deleteCompleted = (id: number) => {
    setCompletedQuizzes(completedQuizzes.filter(q => q.id !== id));
  };

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-background-muted">
      {/* Header */}
      <div className="h-[56px] shrink-0 bg-primary flex items-center justify-between px-4 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="text-white hover:bg-white/10 p-1 -ml-1 rounded-full transition-colors">
            <ChevronLeft className="w-7 h-7" strokeWidth={2} />
          </button>
          <span className="text-white text-lg font-normal tracking-wide ml-0.5">Get Started</span>
        </div>
        <button onClick={() => router.push('/quiz-create')} className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors">
          <FilePlus className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 pb-24">
        
        {/* Quizzes in progress */}
        {inProgressQuizzes.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-semibold text-secondary uppercase tracking-wider">
              Quizzes In Progress:
            </h2>
            
            {inProgressQuizzes.map((quiz, index) => (
              <div key={quiz.id} className={`bg-white border border-border-subtle shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-[4px] flex flex-col overflow-hidden ${index > 0 ? 'mt-1' : ''}`}>
                <div className="p-4 pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="pr-8">
                      <h3 className="text-[16px] font-semibold text-secondary leading-tight">{quiz.name}</h3>
                    </div>
                    <button 
                      onClick={() => setQuizToDelete({ id: quiz.id, type: 'in-progress', mode: quiz.mode })}
                      className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 -mr-2 -mt-2 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-gray-700 font-medium">{quiz.mode}</span>
                      <span className="text-[13px] text-gray-400">{quiz.questions} Questions</span>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-blue-500 uppercase tracking-wider">In Progress</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 p-3 px-4 flex items-center justify-between cursor-pointer bg-gray-50/50 hover:bg-gray-100 active:bg-gray-200 transition-colors">
                  <span className="text-[14px] font-medium text-secondary">Resume quiz</span>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quizzes completed */}
        {completedQuizzes.length > 0 && (
          <div className="flex flex-col gap-3 mt-2">
            <h2 className="text-[13px] font-semibold text-secondary uppercase tracking-wider">
              Quizzes Completed:
            </h2>
            
            {completedQuizzes.map((quiz, index) => (
              <div 
                key={quiz.id} 
                onClick={() => router.push(`/quiz-results/${quiz.id}`)}
                className={`cursor-pointer bg-white border border-border-subtle shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md active:scale-[0.99] transition-all rounded-[4px] flex flex-col overflow-hidden ${index > 0 ? 'mt-1' : ''}`}
              >
                <div className="p-4 pb-3 pointer-events-none">
                  <div className="flex justify-between items-start mb-2 pointer-events-auto">
                    <div className="pr-8 pointer-events-none">
                      <h3 className="text-[16px] font-semibold text-secondary leading-tight">{quiz.name}</h3>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setQuizToDelete({ id: quiz.id, type: 'completed', mode: quiz.mode }); }}
                      className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 -mr-2 -mt-2 rounded-full transition-colors pointer-events-auto"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between pointer-events-none">
                    <div className="flex flex-col gap-1">
                      <span className="text-[14px] text-gray-700 font-medium">{quiz.mode}</span>
                      <span className="text-[13px] text-gray-400">{quiz.questions} Questions</span>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className={`text-[28px] font-bold tracking-tight leading-none ${quiz.score === 100 ? 'text-[#34C759]' : quiz.score < 60 ? 'text-orange-500' : 'text-primary'}`}>
                        {quiz.score.toFixed(1)}%
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Score</span>
                    </div>
                  </div>
                </div>

                {quiz.incorrect > 0 ? (
                  <div 
                    onClick={(e) => { e.stopPropagation(); router.push('/practice-incorrect'); }}
                    className="border-t border-gray-100 p-3 px-4 flex items-center justify-between cursor-pointer bg-gray-50/50 hover:bg-gray-100 active:bg-gray-200 transition-colors pointer-events-auto"
                  >
                    <span className="text-[14px] font-medium text-secondary">Practice {quiz.incorrect} incorrect questions</span>
                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </div>
                ) : (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="border-t border-gray-100 p-3 px-4 flex items-center bg-gray-50/30 cursor-default pointer-events-auto"
                  >
                    <span className="text-[14px] font-medium text-gray-400">All questions correct</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {quizToDelete && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 transition-opacity" onClick={() => setQuizToDelete(null)} />
          <div className="relative bg-white rounded-xl w-full max-w-[300px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete {quizToDelete.mode.toLowerCase().includes('exam') ? 'Exam' : 'Quiz'}</h2>
              <p className="text-sm text-gray-600">
                Do you want to delete this {quizToDelete.mode.toLowerCase().includes('exam') ? 'exam' : 'quiz'}?
              </p>
            </div>
            <div className="flex border-t border-gray-200">
              <button 
                onClick={() => setQuizToDelete(null)}
                className="flex-1 py-3.5 text-[#007AFF] font-medium border-r border-gray-200 hover:bg-gray-50 transition-colors"
              >
                NO
              </button>
              <button 
                onClick={() => {
                  if (quizToDelete.type === 'in-progress') {
                    deleteInProgress(quizToDelete.id);
                  } else {
                    deleteCompleted(quizToDelete.id);
                  }
                  setQuizToDelete(null);
                }}
                className="flex-1 py-3.5 text-red-500 font-semibold hover:bg-gray-50 transition-colors"
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

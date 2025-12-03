import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Progress } from './ui/progress';

interface SCQuestionnaireProps {
  onComplete: () => void;
  onBack: () => void;
}

interface Question {
  id: string;
  categoryKey: string;
  textKey: string;
  type: 'scale5' | 'scale4';
}

const questions: Question[] = [
  { id: '1', categoryKey: 'workload', textKey: 'q1', type: 'scale4' },
  { id: '2', categoryKey: 'workload', textKey: 'q2', type: 'scale4' },
  { id: '3', categoryKey: 'workload', textKey: 'q3', type: 'scale4' },
  { id: '4', categoryKey: 'control', textKey: 'q4', type: 'scale4' },
  { id: '5', categoryKey: 'control', textKey: 'q5', type: 'scale4' },
  { id: '6', categoryKey: 'support', textKey: 'q6', type: 'scale4' },
  { id: '7', categoryKey: 'support', textKey: 'q7', type: 'scale4' },
  { id: '8', categoryKey: 'environment', textKey: 'q8', type: 'scale4' },
  { id: '9', categoryKey: 'stress', textKey: 'q9', type: 'scale4' },
  { id: '10', categoryKey: 'stress', textKey: 'q10', type: 'scale4' },
  { id: '11', categoryKey: 'stress', textKey: 'q11', type: 'scale4' },
  { id: '12', categoryKey: 'stress', textKey: 'q12', type: 'scale4' },
  { id: '13', categoryKey: 'stress', textKey: 'q13', type: 'scale4' },
  { id: '14', categoryKey: 'stress', textKey: 'q14', type: 'scale4' },
  { id: '15', categoryKey: 'satisfaction', textKey: 'q15', type: 'scale4' },
  { id: '16', categoryKey: 'satisfaction', textKey: 'q16', type: 'scale4' },
];

export function SCQuestionnaire({ onComplete, onBack }: SCQuestionnaireProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const getScale4Options = () => [
    { value: 1, label: t('questionnaire.options.yes') },
    { value: 2, label: t('questionnaire.options.somewhatYes') },
    { value: 3, label: t('questionnaire.options.somewhatNo') },
    { value: 4, label: t('questionnaire.options.no') }
  ];

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const canProceed = currentQuestions.every(q => answers[q.id] !== undefined);
  const progress = ((currentPage + 1) / totalPages) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E6F4FF] to-white">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#4A90E2]/10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-[#003E7E]">{t('questionnaire.title')}</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6EC679] to-[#4A90E2] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-[#003E7E] mb-2">{t('questionnaire.completed')}</h2>
            <p className="text-gray-600">{t('questionnaire.thankYou')}</p>
          </div>

          <Card className="p-6 mb-6 rounded-[20px] bg-white/90 backdrop-blur-sm">
            <h3 className="text-[#003E7E] mb-4">{t('questionnaire.importantNotice')}</h3>
            <div className="space-y-3 text-gray-700">
              <p>✓ {t('questionnaire.notice1')}</p>
              <p>✓ {t('questionnaire.notice2')}</p>
              <p>✓ {t('questionnaire.notice3')}</p>
              <p>✓ {t('questionnaire.notice4')}</p>
            </div>
          </Card>

          <div className="p-4 bg-[#E6F4FF] border border-[#4A90E2]/30 rounded-[16px] mb-6">
            <p className="text-sm text-[#003E7E]">
              {t('questionnaire.privacyNotice')}
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-[#6EC679]/20 to-[#4A90E2]/20 border-2 border-[#6EC679] rounded-[16px] mb-6">
            <p className="text-[#003E7E] text-center">
              🎉 {t('questionnaire.counselingUnlocked')}
            </p>
          </div>

          <div className="flex justify-center">
            <Button onClick={onComplete} size="lg" className="bg-[#4A90E2] hover:bg-[#003E7E] rounded-xl">
              {t('questionnaire.backToHome')}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4FF] to-white">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#4A90E2]/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={onBack} className="text-[#4A90E2]">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-[#003E7E]">{t('questionnaire.title')}</h1>
              <p className="text-sm text-gray-600">
                {t('questionnaire.page', { current: currentPage + 1, total: totalPages })}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-[#E6F4FF] border border-[#4A90E2]/30 rounded-[16px]">
          <p className="text-sm text-[#003E7E]">
            {t('questionnaire.instructions')}
          </p>
        </div>

        <div className="space-y-6">
          {currentQuestions.map((question, index) => (
            <Card key={question.id} className="p-6 rounded-[16px] bg-white/90 backdrop-blur-sm">
              <div className="mb-4">
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#4A90E2]/10 text-[#4A90E2] rounded-full flex-shrink-0">
                    {currentPage * questionsPerPage + index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="inline-block px-2 py-1 bg-[#E6F4FF] text-[#4A90E2] rounded text-xs mb-2">
                      {t(`questionnaire.categories.${question.categoryKey}`)}
                    </div>
                    <p className="text-gray-900">{t(`questionnaire.questions.${question.textKey}`)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {getScale4Options().map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      answers[question.id] === option.value
                        ? 'border-[#4A90E2] bg-[#E6F4FF] shadow-md'
                        : 'border-gray-200 hover:border-[#AEE1F9] hover:bg-[#E6F4FF]/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-sm ${
                        answers[question.id] === option.value
                          ? 'text-[#003E7E] font-medium'
                          : 'text-gray-700'
                      }`}>{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="rounded-xl border-[#4A90E2] text-[#4A90E2] hover:bg-[#E6F4FF]"
          >
            {t('questionnaire.previous')}
          </Button>
          <div className="text-sm text-gray-600">
            {t('questionnaire.answered', { count: Object.keys(answers).length, total: questions.length })}
          </div>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="rounded-xl bg-[#4A90E2] hover:bg-[#003E7E]"
          >
            {currentPage === totalPages - 1 ? t('questionnaire.complete') : t('questionnaire.next')}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-[#E6F4FF] border border-[#4A90E2]/30 rounded-[16px]">
          <p className="text-sm text-[#003E7E]">
            {t('questionnaire.rawNotSaved')}
          </p>
        </div>
      </main>
    </div>
  );
}
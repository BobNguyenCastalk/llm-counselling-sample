import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { FaceIcon } from './FaceIcon';
import { TrendIndicator } from './TrendIndicator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface ManagerIndividualViewProps {
  employeeId: string;
  onBack: () => void;
}

type ConditionType = 'excellent' | 'good' | 'normal' | 'low' | 'bad';
type TrendType = 'up-strong' | 'up' | 'flat' | 'down' | 'down-strong';

export function ManagerIndividualView({ employeeId, onBack }: ManagerIndividualViewProps) {
  const { t } = useTranslation();

  const employee = {
    id: '1',
    name: '田中 一郎',
    condition: 'good' as ConditionType,
    trend: 'up' as TrendType,
    department: t('common.departments.salesFirst'),
  };

  const conditionHistory = [
    { date: '12/1', level: 3 },
    { date: '12/8', level: 3 },
    { date: '12/15', level: 4 },
    { date: '12/22', level: 4 },
    { date: '12/29', level: 4 },
  ];

  const abstractFactors = [
    { label: t('managerIndividual.factors.workloadResponse'), status: 'normal', color: 'bg-[#4A90E2]' },
    { label: t('managerIndividual.factors.attention'), status: 'good', color: 'bg-[#72D1FF]' },
    { label: t('managerIndividual.factors.activity'), status: 'normal', color: 'bg-[#7BB7E8]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003E7E] via-[#4A90E2] to-[#7BB7E8]">
      <header className="bg-gradient-to-r from-[#72D1FF] via-[#AEE1F9] to-[#72D1FF] shadow-lg border-b-4 border-[#4A90E2]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-[#003E7E] hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-[#003E7E]">{t('managerIndividual.title')}</h1>
              <p className="text-sm text-[#4A90E2]">{employee.department}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Player Card */}
        <Card className="p-8 mb-6 bg-white/95 border-4 border-[#4A90E2] rounded-[20px] shadow-xl">
          <div className="flex items-center gap-8">
            <FaceIcon condition={employee.condition} size="large" />
            
            <div className="flex-1">
              <h2 className="text-[#003E7E] mb-2">{employee.name}</h2>
              <p className="text-gray-600">{employee.department}</p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <TrendIndicator trend={employee.trend} size="large" showLabel />
              <div className="text-sm text-gray-600">{t('managerIndividual.comparedToLastWeek')}</div>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <div className="mb-6 p-4 bg-white/90 border-2 border-[#4A90E2] rounded-[16px]">
          <p className="text-sm text-[#003E7E]">
            <strong>{t('managerIndividual.dataNotice')}</strong>
          </p>
        </div>

        {/* Condition Trend Graph */}
        <Card className="p-6 mb-6 bg-white/95 border-4 border-[#4A90E2] rounded-[20px] shadow-xl">
          <h3 className="text-[#003E7E] mb-6">{t('managerIndividual.conditionTrend')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conditionHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#AEE1F9" />
                <XAxis dataKey="date" stroke="#003E7E" />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} stroke="#003E7E" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#E6F4FF', 
                    border: '2px solid #4A90E2',
                    borderRadius: '12px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#4A90E2" 
                  strokeWidth={3}
                  dot={{ fill: '#72D1FF', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-600">
            <span>5: {t('managerIndividual.conditions.excellent')}</span>
            <span>4: {t('managerIndividual.conditions.good')}</span>
            <span>3: {t('managerIndividual.conditions.normal')}</span>
            <span>2: {t('managerIndividual.conditions.low')}</span>
            <span>1: {t('managerIndividual.conditions.bad')}</span>
          </div>
        </Card>

        {/* Abstract Factors */}
        <Card className="p-6 bg-white/95 border-4 border-[#4A90E2] rounded-[20px] shadow-xl">
          <h3 className="text-[#003E7E] mb-6">{t('managerIndividual.workFactors')}</h3>
          <div className="grid gap-4">
            {abstractFactors.map((factor, idx) => (
              <div key={idx} className="p-4 bg-[#F5F9FB] rounded-[12px] border-2 border-[#E6F4FF]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#003E7E]">{factor.label}</span>
                  <div className={`w-3 h-3 rounded-full ${factor.color}`} />
                </div>
                <div className="h-2 bg-[#E6F4FF] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${factor.color} transition-all duration-500`}
                    style={{ width: factor.status === 'good' ? '80%' : '60%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#E6F4FF] rounded-[12px]">
            <p className="text-sm text-[#003E7E]">
              <strong>{t('common.note')}</strong> {t('managerIndividual.factorNotice')}
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
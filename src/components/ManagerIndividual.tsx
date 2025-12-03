import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface ManagerIndividualProps {
  employeeId: string;
  onBack: () => void;
}

const mockDataBase = {
  name: '鈴木 太郎',
  departmentKey: 'salesFirst',
  conditionHistory: [
    { date: '11/10', value: 4 },
    { date: '11/11', value: 4 },
    { date: '11/12', value: 3 },
    { date: '11/13', value: 3 },
    { date: '11/14', value: 2 },
    { date: '11/15', value: 2 },
    { date: '11/16', value: 2 },
    { date: '11/17', value: 2 },
  ],
  factorsBase: [
    { nameKey: 'workloadResponse', levelKey: 'high', color: 'orange' },
    { nameKey: 'attention', levelKey: 'stable', color: 'green' },
    { nameKey: 'activity', levelKey: 'declining', color: 'orange' },
    { nameKey: 'responsiveness', levelKey: 'normal', color: 'blue' },
  ]
};

export function ManagerIndividual({ employeeId, onBack }: ManagerIndividualProps) {
  const { t } = useTranslation();

  // Translated data
  const mockData = {
    name: mockDataBase.name,
    department: t(`common.departments.${mockDataBase.departmentKey}`),
    conditionHistory: mockDataBase.conditionHistory,
    factors: mockDataBase.factorsBase.map(factor => ({
      name: t(`managerIndividual.factors.${factor.nameKey}`),
      level: t(`managerIndividual.levels.${factor.levelKey}`),
      color: factor.color
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">{mockData.name}</h1>
              <p className="text-sm text-gray-600">{mockData.department}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>{t('managerIndividual.infoNotice')}</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">{t('managerIndividual.todayCondition')}</h3>
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-gray-900">2</span>
                </div>
                <p className="text-gray-600">{t('managerIndividual.conditions.low')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('managerIndividual.comparedToYesterday')}: ↔ {t('managerIndividual.noChange')}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">{t('managerIndividual.conditionFactors')}</h3>
            <div className="space-y-3">
              {mockData.factors.map((factor, idx) => {
                const colorClasses = {
                  green: 'bg-green-100 text-green-700 border-green-300',
                  blue: 'bg-blue-100 text-blue-700 border-blue-300',
                  orange: 'bg-orange-100 text-orange-700 border-orange-300',
                };
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{factor.name}</span>
                    <span className={`px-3 py-1 rounded-full text-sm border ${colorClasses[factor.color as keyof typeof colorClasses]}`}>
                      {factor.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 mb-4">{t('managerIndividual.dailyTrend')}</h3>
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-gray-700">
              {t('managerIndividual.hiddenNotice')}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.conditionHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={{ fill: '#f97316', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">{t('managerIndividual.weeklyTrend')}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { week: t('managerIndividual.weeks.week1'), avg: 4.2 },
              { week: t('managerIndividual.weeks.week2'), avg: 3.8 },
              { week: t('managerIndividual.weeks.week3'), avg: 2.5 },
              { week: t('managerIndividual.weeks.thisWeek'), avg: 2.0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="avg" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded">
            <p className="text-sm text-gray-700">
              <strong>{t('common.analysis')}</strong> {t('managerIndividual.trendAnalysis')}
            </p>
          </div>
        </Card>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="text-gray-900 mb-2">{t('managerIndividual.recommendedActions')}</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>{t('managerIndividual.action1')}</li>
            <li>{t('managerIndividual.action2')}</li>
            <li>{t('managerIndividual.action3')}</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SCGroupAnalysisProps {
  onBack: () => void;
}

const departmentComparisonBase = [
  { categoryKey: 'workBurden', sales: 68, development: 72, hr: 55, generalAffairs: 60 },
  { categoryKey: 'workControl', sales: 58, development: 65, hr: 70, generalAffairs: 68 },
  { categoryKey: 'supervisorSupport', sales: 72, development: 68, hr: 78, generalAffairs: 75 },
  { categoryKey: 'colleagueSupport', sales: 70, development: 72, hr: 80, generalAffairs: 73 },
  { categoryKey: 'stressResponse', sales: 45, development: 52, hr: 62, generalAffairs: 58 },
];

const timeSeriesBase = [
  { period: '2024/7', workBurden: 65, supervisorSupport: 70, stressResponse: 55 },
  { period: '2024/8', workBurden: 68, supervisorSupport: 72, stressResponse: 53 },
  { period: '2024/9', workBurden: 70, supervisorSupport: 71, stressResponse: 50 },
  { period: '2024/10', workBurden: 72, supervisorSupport: 73, stressResponse: 48 },
  { period: '2024/11', workBurden: 71, supervisorSupport: 75, stressResponse: 52 },
];

const initiativeComparisonBase = [
  { initiativeKey: 'oneOnOne', beforeWR: 65, afterWR: 72, change: 7 },
  { initiativeKey: 'flextime', beforeWR: 68, afterWR: 75, change: 7 },
  { initiativeKey: 'training', beforeWR: 62, afterWR: 70, change: 8 },
  { initiativeKey: 'mentor', beforeWR: 60, afterWR: 68, change: 8 },
];

export function SCGroupAnalysis({ onBack }: SCGroupAnalysisProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('comparison');

  // Translated data for charts
  const departmentComparison = departmentComparisonBase.map(item => ({
    category: t(`stressFactors.${item.categoryKey}`),
    [t('common.departments.sales')]: item.sales,
    [t('common.departments.development')]: item.development,
    [t('common.departments.hr')]: item.hr,
    [t('common.departments.generalAffairs')]: item.generalAffairs,
  }));

  const timeSeries = timeSeriesBase.map(item => ({
    period: item.period,
    [t('stressFactors.workBurden')]: item.workBurden,
    [t('stressFactors.supervisorSupport')]: item.supervisorSupport,
    [t('stressFactors.stressResponse')]: item.stressResponse,
  }));

  const initiativeComparison = initiativeComparisonBase.map(item => ({
    initiative: t(`scGroupAnalysis.initiatives.items.${item.initiativeKey}`),
    beforeWR: item.beforeWR,
    afterWR: item.afterWR,
    change: item.change,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">{t('scGroupAnalysis.title')}</h1>
              <p className="text-sm text-gray-600">{t('scGroupAnalysis.subtitle')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-gray-700">
            {t('scGroupAnalysis.notice')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="comparison">{t('scGroupAnalysis.tabs.comparison')}</TabsTrigger>
            <TabsTrigger value="trends">{t('scGroupAnalysis.tabs.trends')}</TabsTrigger>
            <TabsTrigger value="initiatives">{t('scGroupAnalysis.tabs.initiatives')}</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">{t('scGroupAnalysis.comparison.radarTitle')}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-gray-700 mb-4 text-center">{t('common.departments.sales')}</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={departmentComparison}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name={t('common.departments.sales')} dataKey={t('common.departments.sales')} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="text-gray-700 mb-4 text-center">{t('common.departments.development')}</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={departmentComparison}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name={t('common.departments.development')} dataKey={t('common.departments.development')} stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">{t('scGroupAnalysis.comparison.barTitle')}</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={t('common.departments.sales')} fill="#3b82f6" />
                  <Bar dataKey={t('common.departments.development')} fill="#10b981" />
                  <Bar dataKey={t('common.departments.hr')} fill="#f59e0b" />
                  <Bar dataKey={t('common.departments.generalAffairs')} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">{t('scGroupAnalysis.comparison.highRiskDepts')}</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{t('common.departments.sales')}</span>
                      <span className="text-red-600">{t('scGroupAnalysis.comparison.status.attention')}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('scGroupAnalysis.comparison.deptDescriptions.salesHighLoad')}
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{t('common.departments.development')}</span>
                      <span className="text-orange-600">{t('scGroupAnalysis.comparison.status.caution')}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('scGroupAnalysis.comparison.deptDescriptions.devModerateLoad')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">{t('scGroupAnalysis.comparison.goodDepts')}</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{t('common.departments.hr')}</span>
                      <span className="text-green-600">{t('scGroupAnalysis.comparison.status.good')}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('scGroupAnalysis.comparison.deptDescriptions.hrBalanced')}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{t('common.departments.generalAffairs')}</span>
                      <span className="text-blue-600">{t('scGroupAnalysis.comparison.status.stable')}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('scGroupAnalysis.comparison.deptDescriptions.generalSupport')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">{t('scGroupAnalysis.trends.monthlyTitle')}</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={t('stressFactors.workBurden')} stroke="#ef4444" strokeWidth={2} name={t('scGroupAnalysis.trends.categories.workload')} />
                  <Line type="monotone" dataKey={t('stressFactors.supervisorSupport')} stroke="#3b82f6" strokeWidth={2} name={t('scGroupAnalysis.trends.categories.supervisorSupport')} />
                  <Line type="monotone" dataKey={t('stressFactors.stressResponse')} stroke="#f59e0b" strokeWidth={2} name={t('scGroupAnalysis.trends.categories.stressResponse')} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6">
                <h4 className="text-gray-900 mb-4">{t('scGroupAnalysis.trends.categories.workload')}</h4>
                <div className="text-center py-4">
                  <div className="text-gray-900 mb-2">71</div>
                  <p className="text-sm text-orange-600">{t('scGroupAnalysis.trends.monthChange', { change: -1 })}</p>
                  <p className="text-xs text-gray-600 mt-2">{t('scGroupAnalysis.trends.statusLabels.somewhatHigh')}</p>
                </div>
              </Card>
              <Card className="p-6">
                <h4 className="text-gray-900 mb-4">{t('scGroupAnalysis.trends.categories.supervisorSupport')}</h4>
                <div className="text-center py-4">
                  <div className="text-gray-900 mb-2">75</div>
                  <p className="text-sm text-green-600">{t('scGroupAnalysis.trends.monthChange', { change: '+2' })}</p>
                  <p className="text-xs text-gray-600 mt-2">{t('scGroupAnalysis.trends.statusLabels.improving')}</p>
                </div>
              </Card>
              <Card className="p-6">
                <h4 className="text-gray-900 mb-4">{t('scGroupAnalysis.trends.categories.stressResponse')}</h4>
                <div className="text-center py-4">
                  <div className="text-gray-900 mb-2">52</div>
                  <p className="text-sm text-red-600">{t('scGroupAnalysis.trends.monthChange', { change: '+4' })}</p>
                  <p className="text-xs text-gray-600 mt-2">{t('scGroupAnalysis.trends.statusLabels.needsAttention')}</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="initiatives" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">{t('scGroupAnalysis.initiatives.title')}</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={initiativeComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="initiative" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="beforeWR" fill="#94a3b8" name={t('scGroupAnalysis.initiatives.before')} />
                  <Bar dataKey="afterWR" fill="#3b82f6" name={t('scGroupAnalysis.initiatives.after')} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {initiativeComparison.map((item, idx) => (
                <Card key={idx} className="p-6">
                  <h4 className="text-gray-900 mb-4">{item.initiative}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('scGroupAnalysis.initiatives.beforeWR')}</span>
                      <span className="text-gray-900">{item.beforeWR}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('scGroupAnalysis.initiatives.afterWR')}</span>
                      <span className="text-gray-900">{item.afterWR}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('scGroupAnalysis.initiatives.change')}</span>
                      <span className="text-green-600">+{item.change}pt ↑</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-gray-700">
                      {t('scGroupAnalysis.initiatives.effective')}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">{t('scGroupAnalysis.initiatives.nextActions')}</h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">✅ {t('scGroupAnalysis.initiatives.actions.expand')}</h4>
                  <p className="text-gray-700">
                    {t('scGroupAnalysis.initiatives.actions.expandDesc')}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">🔍 {t('scGroupAnalysis.initiatives.actions.additional')}</h4>
                  <p className="text-gray-700">
                    {t('scGroupAnalysis.initiatives.actions.additionalDesc')}
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">📊 {t('scGroupAnalysis.initiatives.actions.monitor')}</h4>
                  <p className="text-gray-700">
                    {t('scGroupAnalysis.initiatives.actions.monitorDesc')}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

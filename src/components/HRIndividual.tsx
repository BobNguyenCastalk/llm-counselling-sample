import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Stethoscope, FileText, Clock } from 'lucide-react';
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface HRIndividualProps {
  employeeId: string;
  onBack: () => void;
}

const mockDataBase = {
  name: '山田太郎',
  departmentKey: 'development',
  positionKey: 'engineer',
  wrHistory: [
    { date: '10/1', wr: 75 },
    { date: '10/8', wr: 72 },
    { date: '10/15', wr: 68 },
    { date: '10/22', wr: 62 },
    { date: '10/29', wr: 55 },
    { date: '11/5', wr: 48 },
    { date: '11/12', wr: 45 },
    { date: '11/17', wr: 45 },
  ],
  scCategoriesBase: [
    { categoryKey: 'workplaceEnvironment', score: 65 },
    { categoryKey: 'interpersonalRelations', score: 58 },
    { categoryKey: 'workBurden', score: 35 },
    { categoryKey: 'workControl', score: 42 },
    { categoryKey: 'supervisorSupport', score: 70 },
  ],
  slackBehaviorBase: [
    { metricKey: 'responseSpeed', statusKey: 'declining', trend: 'down', detailKey: 'responseSpeedDesc' },
    { metricKey: 'messageLength', statusKey: 'declining', trend: 'down', detailKey: 'messageLengthDesc' },
    { metricKey: 'postFrequency', statusKey: 'declining', trend: 'down', detailKey: 'postFrequencyDesc' },
    { metricKey: 'reactions', statusKey: 'stable', trend: 'stable', detailKey: 'reactionsDesc' },
  ],
  slackSentiment: {
    positive: 15,
    neutral: 60,
    negative: 25,
  },
  slackEmotionsBase: [
    { emotionKey: 'anxiety', level: 68, trend: 'up' },
    { emotionKey: 'fatigue', level: 72, trend: 'up' },
    { emotionKey: 'impatience', level: 55, trend: 'stable' },
    { emotionKey: 'isolation', level: 48, trend: 'down' },
  ],
  slackFeaturesBase: [
    { featureKey: 'negativeExpressions', valueKey: 'increasing', detailKey: 'negativeExpressionsDesc' },
    { featureKey: 'questionRatio', valueKey: 'normal', detailKey: 'questionRatioDesc' },
    { featureKey: 'immediateResponseRate', valueKey: 'declining', detailKey: 'immediateResponseDesc' },
    { featureKey: 'lateNightPosts', valueKey: 'increasing', detailKey: 'lateNightPostsDesc' },
  ]
};

export function HRIndividual({ employeeId, onBack }: HRIndividualProps) {
  const { t } = useTranslation();

  // Translated data
  const mockData = {
    name: mockDataBase.name,
    department: t(`common.departments.${mockDataBase.departmentKey}`),
    position: t(`common.positions.${mockDataBase.positionKey}`),
    wrHistory: mockDataBase.wrHistory,
    scCategories: mockDataBase.scCategoriesBase.map(item => ({
      category: t(`scCategories.${item.categoryKey}`),
      score: item.score
    })),
    slackBehavior: mockDataBase.slackBehaviorBase.map(item => ({
      metric: t(`hrIndividual.metrics.${item.metricKey}`),
      status: t(`hrIndividual.metricStatus.${item.statusKey}`),
      trend: item.trend,
      detail: t(`mockData.slackBehavior.${item.detailKey}`)
    })),
    slackSentiment: mockDataBase.slackSentiment,
    slackEmotions: mockDataBase.slackEmotionsBase.map(item => ({
      emotion: t(`hrIndividual.emotions.${item.emotionKey}`),
      emotionKey: item.emotionKey,
      level: item.level,
      trend: item.trend
    })),
    slackFeatures: mockDataBase.slackFeaturesBase.map(item => ({
      feature: t(`hrIndividual.features.${item.featureKey}`),
      value: t(`hrIndividual.featureValues.${item.valueKey}`),
      detail: t(`mockData.slackBehavior.${item.detailKey}`)
    }))
  };

  const currentWR = mockData.wrHistory[mockData.wrHistory.length - 1].wr;

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
              <p className="text-sm text-gray-600">{mockData.department} - {mockData.position}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>{t('hrIndividual.permission')}</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">{t('hrIndividual.currentWR')}</h3>
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 mx-auto ${
                  currentWR >= 70 ? 'bg-gradient-to-br from-green-200 to-green-300' :
                  currentWR >= 50 ? 'bg-gradient-to-br from-yellow-200 to-yellow-300' :
                  'bg-gradient-to-br from-red-200 to-red-300'
                }`}>
                  <span className="text-gray-900">{currentWR}</span>
                </div>
                <p className={`${
                  currentWR >= 70 ? 'text-green-600' :
                  currentWR >= 50 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {currentWR >= 70 ? t('hrIndividual.status.good') : currentWR >= 50 ? t('hrIndividual.status.caution') : t('hrIndividual.status.action')}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">{t('hrIndividual.trend')}</h3>
            <div className="space-y-3 py-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('hrIndividual.weekAgo')}</span>
                <span className="text-gray-900">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('hrIndividual.monthAgo')}</span>
                <span className="text-gray-900">68</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('hrIndividual.change')}</span>
                <span className="text-red-600">-23pt ↓</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">{t('hrIndividual.alerts')}</h3>
            <div className="space-y-2 py-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-700">{t('hrIndividual.rapidDecline')}</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <p className="text-sm text-orange-700">{t('hrIndividual.continuousLow')}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 mb-4">{t('hrIndividual.wrTrend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.wrHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="wr"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                name={t('hr.workReadiness')}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-gray-700">
              <strong>{t('common.analysis')}</strong> {t('hrIndividual.analysisNote')}
            </p>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 mb-4">{t('hrIndividual.scCategorySummary')}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={mockData.scCategories}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name={t('common.score')} dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {mockData.scCategories.map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">{cat.category}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  cat.score >= 70 ? 'bg-green-100 text-green-700' :
                  cat.score >= 50 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {cat.score}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-gray-900 mb-4">{t('hrIndividual.slackBehavior')}</h3>

          {/* Privacy Notice */}
          <div className="mb-4 p-3 bg-[#E6F4FF] border-2 border-[#4A90E2]/30 rounded-lg">
            <p className="text-sm text-[#003E7E]">
              <strong>{t('common.privacyProtection')}</strong> {t('hrIndividual.slackPrivacy')}
            </p>
          </div>

          {/* Sentiment Analysis */}
          <div className="mb-6 p-4 bg-white border-2 border-[#4A90E2]/20 rounded-lg">
            <h4 className="text-gray-900 mb-3">💬 {t('hrIndividual.sentimentAnalysis')}</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{t('hrIndividual.positive')}</span>
                  <span className="text-sm text-gray-900">{mockData.slackSentiment.positive}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#6EC679] h-2 rounded-full transition-all"
                    style={{ width: `${mockData.slackSentiment.positive}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{t('hrIndividual.neutral')}</span>
                  <span className="text-sm text-gray-900">{mockData.slackSentiment.neutral}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#4A90E2] h-2 rounded-full transition-all"
                    style={{ width: `${mockData.slackSentiment.neutral}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{t('hrIndividual.negative')}</span>
                  <span className="text-sm text-gray-900">{mockData.slackSentiment.negative}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#BFC9D1] h-2 rounded-full transition-all"
                    style={{ width: `${mockData.slackSentiment.negative}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-[#E6F4FF] rounded text-xs text-[#003E7E]">
              {t('hrIndividual.sentimentNote')}
            </div>
          </div>

          {/* Emotion Indicators */}
          <div className="mb-6 p-4 bg-white border-2 border-[#4A90E2]/20 rounded-lg">
            <h4 className="text-gray-900 mb-3">🧠 {t('hrIndividual.emotionIndicators')}</h4>
            <div className="space-y-3">
              {mockData.slackEmotions.map((emotion, idx) => {
                const trendText = emotion.trend === 'up' ? t('hrIndividual.increasing') :
                                 emotion.trend === 'down' ? t('hrIndividual.decreasing') :
                                 t('hrIndividual.stable');
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{emotion.emotion}</span>
                        <span className="text-xs text-gray-500">
                          {emotion.trend === 'up' ? '↑' : emotion.trend === 'down' ? '↓' : '→'} {trendText}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">{emotion.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          emotion.level >= 70 ? 'bg-[#BFC9D1]' :
                          emotion.level >= 50 ? 'bg-[#7BB7E8]' :
                          'bg-[#6EC679]'
                        }`}
                        style={{ width: `${emotion.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 p-2 bg-[#E6F4FF] rounded text-xs text-[#003E7E]">
              {t('hrIndividual.emotionNote')}
            </div>
          </div>

          {/* Text Features */}
          <div className="mb-4 p-4 bg-white border-2 border-[#4A90E2]/20 rounded-lg">
            <h4 className="text-gray-900 mb-3">📊 {t('hrIndividual.textFeatures')}</h4>
            <div className="space-y-2">
              {mockData.slackFeatures.map((feature, idx) => (
                <div key={idx} className="p-3 bg-[#F5F9FB] rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">{feature.feature}</span>
                    <span className="text-sm px-2 py-1 bg-white border border-[#4A90E2]/30 rounded">
                      {feature.value}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{feature.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Behavior Metrics */}
          <div className="p-4 bg-white border-2 border-[#4A90E2]/20 rounded-lg">
            <h4 className="text-gray-900 mb-3">📈 {t('hrIndividual.behaviorMetrics')}</h4>
            <div className="space-y-3">
              {mockData.slackBehavior.map((behavior, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900">{behavior.metric}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      behavior.trend === 'down' ? 'bg-[#BFC9D1] text-[#003E7E]' :
                      behavior.trend === 'up' ? 'bg-[#6EC679] text-white' :
                      'bg-[#4A90E2] text-white'
                    }`}>
                      {behavior.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{behavior.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">{t('hrIndividual.recommendedActions')}</h3>

          {/* Physician Recommendations - if consent given */}
          <div className="mb-6 p-5 bg-gradient-to-br from-[#E6F4FF] to-white border-2 border-[#4A90E2] rounded-[16px]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#003E7E] rounded-[12px] flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#003E7E]">🏥 {t('hrIndividual.physicianRecommendations')}</h4>
                  <div className="px-3 py-1 bg-[#6EC679] text-white text-xs rounded-full">
                    {t('hrIndividual.consentGiven')}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Clock className="w-3 h-3" />
                  <span>{t('hrIndividual.lastUpdated')} 2024/11/17 14:30</span>
                </div>
              </div>
            </div>

            {/* Medical Findings */}
            <div className="mb-4 p-4 bg-white/80 border border-[#4A90E2]/30 rounded-[12px]">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[#003E7E]" />
                <h5 className="text-[#003E7E]">{t('hrIndividual.medicalFindings')}</h5>
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">
                {t('mockData.medicalFindings')}
              </p>
            </div>

            {/* Physician Recommendations */}
            <div className="p-4 bg-white/80 border border-[#4A90E2]/30 rounded-[12px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-[#4A90E2] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💊</span>
                </div>
                <h5 className="text-[#003E7E]">{t('hrIndividual.recommendations')}</h5>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{t('mockData.recommendations.rec1')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{t('mockData.recommendations.rec2')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{t('mockData.recommendations.rec3')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{t('mockData.recommendations.rec4')}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#6EC679]/10 border border-[#6EC679]/30 rounded-[12px]">
              <p className="text-xs text-[#003E7E]">
                <strong>📌 {t('hrIndividual.hrNote')}</strong>
              </p>
            </div>
          </div>

          {/* HR General Recommendations */}
          <div className="space-y-3">
            <div className="p-4 bg-[#BFC9D1]/10 border border-[#BFC9D1] rounded-lg">
              <h4 className="text-gray-900 mb-2">🚨 {t('hrIndividual.urgentAction')}</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>{t('hrIndividual.urgentActions.action1')}</li>
                <li>{t('hrIndividual.urgentActions.action2')}</li>
                <li>{t('hrIndividual.urgentActions.action3')}</li>
              </ul>
            </div>
            <div className="p-4 bg-[#7BB7E8]/10 border border-[#7BB7E8] rounded-lg">
              <h4 className="text-gray-900 mb-2">📋 {t('hrIndividual.mediumTermMeasures')}</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>{t('hrIndividual.mediumActions.action1')}</li>
                <li>{t('hrIndividual.mediumActions.action2')}</li>
                <li>{t('hrIndividual.mediumActions.action3')}</li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
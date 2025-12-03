import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Calendar, Filter, MessageSquare, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ConversationHistoryProps {
  onBack: () => void;
}

// Sample data with translation keys
const conversationDataBase = [
  {
    id: '1',
    date: '2024-11-15',
    time: '10:30',
    durationMin: 15,
    summaryKey: 'conv1Summary',
    moodKey: 'normal',
    topicKeys: ['work', 'projectManagement']
  },
  {
    id: '2',
    date: '2024-11-14',
    time: '14:20',
    durationMin: 12,
    summaryKey: 'conv2Summary',
    moodKey: 'good',
    topicKeys: ['communication', 'teamwork']
  },
  {
    id: '3',
    date: '2024-11-13',
    time: '09:15',
    durationMin: 18,
    summaryKey: 'conv3Summary',
    moodKey: 'normal',
    topicKeys: ['reflection', 'work']
  },
  {
    id: '4',
    date: '2024-11-10',
    time: '16:45',
    durationMin: 20,
    summaryKey: 'conv4Summary',
    moodKey: 'positive',
    topicKeys: ['career', 'selfDevelopment']
  },
  {
    id: '5',
    date: '2024-11-08',
    time: '11:00',
    durationMin: 10,
    summaryKey: 'conv5Summary',
    moodKey: 'good',
    topicKeys: ['vacation', 'workLifeBalance']
  },
  {
    id: '6',
    date: '2024-10-28',
    time: '15:30',
    durationMin: 25,
    summaryKey: 'conv6Summary',
    moodKey: 'normal',
    topicKeys: ['goalSetting', 'reflection']
  },
];

export function ConversationHistory({ onBack }: ConversationHistoryProps) {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');
  const [selectedPeriod, setSelectedPeriod] = useState('thisWeek');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Translated conversation data
  const conversationData = conversationDataBase.map(conv => ({
    id: conv.id,
    date: conv.date,
    time: conv.time,
    duration: t('common.counters.minutes', { count: conv.durationMin }),
    summary: t(`mockData.conversations.${conv.summaryKey}`),
    mood: t(`mockData.moods.${conv.moodKey}`),
    topics: conv.topicKeys.map(key => t(`mockData.tags.${key}`))
  }));

  // Filter logic (simplified)
  const filteredConversations = conversationData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4FF] to-white">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#4A90E2]/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-[#4A90E2]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back')}
            </Button>
            <div>
              <h1 className="text-[#003E7E]">{t('history.title')}</h1>
              <p className="text-sm text-gray-600">{t('history.subtitle')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[20px] shadow-lg mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#4A90E2]" />
            <h3 className="text-[#003E7E]">{t('history.periodFilter')}</h3>
          </div>

          <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)} className="space-y-4">
            <TabsList className="bg-white/80 border-2 border-[#4A90E2]/20 rounded-[16px]">
              <TabsTrigger value="daily" className="data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-[12px]">
                {t('history.daily')}
              </TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-[12px]">
                {t('history.weekly')}
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-[12px]">
                {t('history.monthly')}
              </TabsTrigger>
              <TabsTrigger value="custom" className="data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-[12px]">
                {t('history.custom')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {t('history.selectDate')}
                </label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="bg-white border-2 border-[#4A90E2]/20 rounded-[12px] focus:ring-[#4A90E2] max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{t('history.today')}</SelectItem>
                    <SelectItem value="yesterday">{t('history.yesterday')}</SelectItem>
                    <SelectItem value="2daysAgo">{t('history.daysAgo', { count: 2 })}</SelectItem>
                    <SelectItem value="3daysAgo">{t('history.daysAgo', { count: 3 })}</SelectItem>
                    <SelectItem value="4daysAgo">{t('history.daysAgo', { count: 4 })}</SelectItem>
                    <SelectItem value="5daysAgo">{t('history.daysAgo', { count: 5 })}</SelectItem>
                    <SelectItem value="6daysAgo">{t('history.daysAgo', { count: 6 })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {t('history.selectWeek')}
                </label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="bg-white border-2 border-[#4A90E2]/20 rounded-[12px] focus:ring-[#4A90E2] max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisWeek">{t('history.thisWeek')}</SelectItem>
                    <SelectItem value="lastWeek">{t('history.lastWeek')}</SelectItem>
                    <SelectItem value="2weeksAgo">{t('history.weeksAgo', { count: 2 })}</SelectItem>
                    <SelectItem value="3weeksAgo">{t('history.weeksAgo', { count: 3 })}</SelectItem>
                    <SelectItem value="4weeksAgo">{t('history.weeksAgo', { count: 4 })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {t('history.selectMonth')}
                </label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="bg-white border-2 border-[#4A90E2]/20 rounded-[12px] focus:ring-[#4A90E2] max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisMonth">{t('history.thisMonth')}</SelectItem>
                    <SelectItem value="lastMonth">{t('history.lastMonth')}</SelectItem>
                    <SelectItem value="2monthsAgo">{t('history.monthsAgo', { count: 2 })}</SelectItem>
                    <SelectItem value="3monthsAgo">{t('history.monthsAgo', { count: 3 })}</SelectItem>
                    <SelectItem value="4monthsAgo">{t('history.monthsAgo', { count: 4 })}</SelectItem>
                    <SelectItem value="5monthsAgo">{t('history.monthsAgo', { count: 5 })}</SelectItem>
                    <SelectItem value="6monthsAgo">{t('history.monthsAgo', { count: 6 })}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm text-gray-600">{t('history.startDate')}</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="px-4 py-2 border-2 border-[#4A90E2]/20 rounded-[12px] focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm text-gray-600">{t('history.endDate')}</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="px-4 py-2 border-2 border-[#4A90E2]/20 rounded-[12px] focus:ring-2 focus:ring-[#4A90E2] focus:outline-none"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Active Filter Display */}
          <div className="mt-4 pt-4 border-t border-[#E6F4FF]">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">{t('common.displayPeriod')}</span>
              <div className="px-3 py-1 bg-[#E6F4FF] rounded-full text-sm text-[#003E7E]">
                {filterType === 'daily' && t('history.daily')}
                {filterType === 'weekly' && t('history.weekly')}
                {filterType === 'monthly' && t('history.monthly')}
                {filterType === 'custom' && t('history.custom')}
              </div>
              {filterType !== 'custom' && (
                <div className="px-3 py-1 bg-[#E6F4FF] rounded-full text-sm text-[#003E7E]">
                  {selectedPeriod === 'today' && t('history.today')}
                  {selectedPeriod === 'yesterday' && t('history.yesterday')}
                  {selectedPeriod === 'thisWeek' && t('history.thisWeek')}
                  {selectedPeriod === 'lastWeek' && t('history.lastWeek')}
                  {selectedPeriod === 'thisMonth' && t('history.thisMonth')}
                  {selectedPeriod === 'lastMonth' && t('history.lastMonth')}
                </div>
              )}
              {filterType === 'custom' && customStartDate && customEndDate && (
                <div className="px-3 py-1 bg-[#E6F4FF] rounded-full text-sm text-[#003E7E]">
                  {customStartDate} {t('common.dateRange')} {customEndDate}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Conversation List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#003E7E]">{t('history.conversationCount', { count: filteredConversations.length })}</h3>
          </div>

          {filteredConversations.map((conversation) => (
            <Card
              key={conversation.id}
              className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2]/20 rounded-[20px] shadow-md hover:shadow-lg transition-all cursor-pointer hover:border-[#4A90E2]"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#72D1FF] rounded-[16px] flex items-center justify-center shadow-md">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[#003E7E]">{conversation.date}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {conversation.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-3 py-1 bg-[#E6F4FF] rounded-full text-sm text-[#4A90E2]">
                        {conversation.duration}
                      </div>
                      <div className="px-3 py-1 bg-[#E6F4FF] rounded-full text-sm text-[#6EC679]">
                        {conversation.mood}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{conversation.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {conversation.topics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#4A90E2]/10 to-[#72D1FF]/10 border border-[#4A90E2]/20 rounded-full text-sm text-[#003E7E]"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center md:justify-end">
                  <div className="text-[#4A90E2] text-xl">›</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredConversations.length === 0 && (
          <Card className="p-12 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2]/20 rounded-[20px] shadow-md text-center">
            <MessageSquare className="w-16 h-16 text-[#BFC9D1] mx-auto mb-4" />
            <h3 className="text-[#003E7E] mb-2">{t('history.noHistory')}</h3>
            <p className="text-gray-600">{t('history.noHistoryDesc')}</p>
          </Card>
        )}

        {/* Privacy Notice */}
        <div className="mt-8 p-6 bg-[#E6F4FF]/50 rounded-[16px] border border-[#4A90E2]/20 backdrop-blur-sm">
          <p className="text-sm text-[#003E7E]">
            {t('history.privacyNotice')}
          </p>
        </div>
      </main>
    </div>
  );
}

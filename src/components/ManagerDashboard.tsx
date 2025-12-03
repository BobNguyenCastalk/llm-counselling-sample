import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Search, LogOut, TrendingUp, TrendingDown, Minus, ArrowUpDown } from 'lucide-react';
import { FaceIcon } from './FaceIcon';
import { TrendIndicator } from './TrendIndicator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ManagerDashboardProps {
  onLogout: () => void;
  onViewIndividual: (id: string) => void;
}

type ConditionType = 'excellent' | 'good' | 'normal' | 'low' | 'bad';
type TrendType = 'up-strong' | 'up' | 'flat' | 'down' | 'down-strong';

interface Employee {
  id: string;
  name: string;
  condition: ConditionType;
  trend: TrendType;
  tags: string[];
}

const mockEmployeesBase = [
  { id: '1', name: '田中 一郎', condition: 'excellent' as ConditionType, trend: 'up-strong' as TrendType, tagKeys: ['stable'] },
  { id: '2', name: '佐藤 花子', condition: 'good' as ConditionType, trend: 'flat' as TrendType, tagKeys: ['good'] },
  { id: '3', name: '鈴木 太郎', condition: 'low' as ConditionType, trend: 'down' as TrendType, tagKeys: ['attention'] },
  { id: '4', name: '高橋 美咲', condition: 'normal' as ConditionType, trend: 'flat' as TrendType, tagKeys: [] },
  { id: '5', name: '伊藤 健', condition: 'excellent' as ConditionType, trend: 'up-strong' as TrendType, tagKeys: ['stable'] },
  { id: '6', name: '渡辺 真由美', condition: 'good' as ConditionType, trend: 'up' as TrendType, tagKeys: ['good'] },
  { id: '7', name: '山本 大輔', condition: 'normal' as ConditionType, trend: 'down' as TrendType, tagKeys: [] },
  { id: '8', name: '中村 愛', condition: 'bad' as ConditionType, trend: 'down' as TrendType, tagKeys: ['attention', 'declining'] },
];

export function ManagerDashboard({ onLogout, onViewIndividual }: ManagerDashboardProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'condition' | 'trend'>('name');

  // Translated employee data
  const mockEmployees: Employee[] = mockEmployeesBase.map(emp => ({
    ...emp,
    tags: emp.tagKeys.map(key => t(`manager.tags.${key}`))
  }));

  const getConditionLabel = (condition: ConditionType) => {
    switch (condition) {
      case 'excellent': return { label: 'SS', color: 'text-[#C7EBFF]', bg: 'bg-gradient-to-r from-[#C7EBFF] to-[#72D1FF]', badge: '✦', glow: 'shadow-[0_0_20px_rgba(199,235,255,0.6)]' };
      case 'good': return { label: 'S', color: 'text-[#72D1FF]', bg: 'bg-gradient-to-r from-[#72D1FF] to-[#4A90E2]', badge: '↑', glow: '' };
      case 'normal': return { label: 'A', color: 'text-[#4A90E2]', bg: 'bg-gradient-to-r from-[#4A90E2] to-[#7BB7E8]', badge: '→', glow: '' };
      case 'low': return { label: 'B', color: 'text-[#AEE1F9]', bg: 'bg-gradient-to-r from-[#AEE1F9] to-[#BFC9D1]', badge: '↓', glow: '' };
      case 'bad': return { label: 'C', color: 'text-[#BFC9D1]', bg: 'bg-gradient-to-r from-[#BFC9D1] to-[#94A3AE]', badge: '↓↓', glow: '' };
      default: return { label: '-', color: 'text-gray-600', bg: 'bg-gray-200', badge: '', glow: '' };
    }
  };

  const getTrendIcon = (trend: TrendType) => {
    switch (trend) {
      case 'up-strong': return <TrendingUp className="w-4 h-4 text-[#72D1FF]" />;
      case 'up': return <TrendingUp className="w-4 h-4 text-[#72D1FF]" />;
      case 'flat': return <Minus className="w-4 h-4 text-[#7BB7E8]" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-[#BFC9D1]" />;
      case 'down-strong': return <TrendingDown className="w-4 h-4 text-[#BFC9D1]" />;
      default: return <Minus className="w-4 h-4 text-[#7BB7E8]" />;
    }
  };

  // Helper functions for sorting
  const getConditionValue = (condition: ConditionType): number => {
    switch (condition) {
      case 'excellent': return 5;
      case 'good': return 4;
      case 'normal': return 3;
      case 'low': return 2;
      case 'bad': return 1;
      default: return 0;
    }
  };

  const getTrendValue = (trend: TrendType): number => {
    switch (trend) {
      case 'up-strong': return 5;
      case 'up': return 4;
      case 'flat': return 3;
      case 'down': return 2;
      case 'down-strong': return 1;
      default: return 0;
    }
  };

  const filteredEmployees = mockEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortBy) {
      case 'condition':
        return getConditionValue(b.condition) - getConditionValue(a.condition);
      case 'trend':
        return getTrendValue(b.trend) - getTrendValue(a.trend);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const stats = {
    total: mockEmployees.length,
    good: mockEmployees.filter(e => e.condition === 'excellent' || e.condition === 'good').length,
    needsAttention: mockEmployees.filter(e => e.condition === 'low' || e.condition === 'bad').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003E7E] via-[#4A90E2] to-[#7BB7E8]">
      {/* Stadium-style header - Cold colors only */}
      <header className="bg-gradient-to-r from-[#72D1FF] via-[#AEE1F9] to-[#72D1FF] shadow-lg border-b-4 border-[#4A90E2]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#4A90E2]">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="text-[#003E7E]">{t('manager.dashboard')}</h1>
                <p className="text-sm text-[#4A90E2]">{t('manager.department')}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onLogout} className="text-[#003E7E] hover:bg-white/20">
              <LogOut className="w-4 h-4 mr-2" />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 p-5 bg-white/95 border-4 border-[#4A90E2] rounded-[20px] shadow-xl">
          <p className="text-sm text-gray-700">
            {t('manager.dataNotice')}
          </p>
        </div>

        {/* Game-style stats cards - Cold colors only */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-white to-[#E6F4FF] border-4 border-[#4A90E2] rounded-[20px] shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#003E7E] mb-1">{t('manager.teamSize')}</p>
                <p className="text-3xl text-[#003E7E]">{stats.total}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#003E7E] rounded-[16px] flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-[#E6F4FF] border-4 border-[#72D1FF] rounded-[20px] shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#4A90E2] mb-1">{t('manager.good')}</p>
                <p className="text-3xl text-[#003E7E]">{stats.good}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#72D1FF] to-[#4A90E2] rounded-[16px] flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-[#F5F9FB] border-4 border-[#BFC9D1] rounded-[20px] shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#BFC9D1] mb-1">{t('manager.needsAttention')}</p>
                <p className="text-3xl text-[#003E7E]">{stats.needsAttention}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#BFC9D1] to-[#94A3AE] rounded-[16px] flex items-center justify-center shadow-lg">
                <TrendingDown className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white/95 border-4 border-[#4A90E2] rounded-[20px] shadow-xl">
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={t('manager.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-2 border-[#AEE1F9] focus:border-[#4A90E2]"
                />
              </div>
              <Select onValueChange={(value) => setSortBy(value as 'name' | 'condition' | 'trend')}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-[#AEE1F9] focus:border-[#4A90E2]">
                  <SelectValue placeholder={t('manager.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{t('manager.sortName')}</SelectItem>
                  <SelectItem value="condition">{t('manager.sortCondition')}</SelectItem>
                  <SelectItem value="trend">{t('manager.sortTrend')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Player card style list */}
          <div className="space-y-4">
            {sortedEmployees.map((employee) => {
              return (
                <div
                  key={employee.id}
                  className="bg-gradient-to-r from-white to-[#F5F9FB] border-4 border-[#E6F4FF] rounded-[16px] p-5 hover:shadow-xl transition-all cursor-pointer hover:border-[#4A90E2] hover:scale-[1.02]"
                  onClick={() => onViewIndividual(employee.id)}
                >
                  <div className="flex items-center gap-6">
                    {/* Face icon - Game style */}
                    <FaceIcon condition={employee.condition} size="large" />

                    {/* Name */}
                    <div className="flex-1">
                      <p className="text-xl text-gray-900">{employee.name}</p>
                    </div>

                    {/* Trend */}
                    <div className="flex items-center gap-2">
                      <TrendIndicator trend={employee.trend} size="medium" showLabel />
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 min-w-[120px]">
                      {mockEmployeesBase.find(e => e.id === employee.id)?.tagKeys.map((tagKey, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs border-2 ${
                            tagKey === 'attention' || tagKey === 'declining'
                              ? 'bg-[#BFC9D1] text-white border-[#94A3AE]'
                              : 'bg-[#72D1FF] text-white border-[#4A90E2]'
                          }`}
                        >
                          {t(`manager.tags.${tagKey}`)}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="text-[#4A90E2] text-2xl">›</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
}
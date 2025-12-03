import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, Users, TrendingUp, TrendingDown, BarChart3, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTranslation } from 'react-i18next';

interface HRDashboardProps {
  onViewIndividual: (employeeId: string) => void;
  onViewSCAnalysis: () => void;
  onLogout: () => void;
}

const departmentDataBase = [
  { nameKey: 'sales', avgWR: 72, count: 45, lowCount: 5, improvedCount: 8 },
  { nameKey: 'development', avgWR: 68, count: 38, lowCount: 7, improvedCount: 5 },
  { nameKey: 'hr', avgWR: 78, count: 12, lowCount: 1, improvedCount: 3 },
  { nameKey: 'generalAffairs', avgWR: 75, count: 15, lowCount: 2, improvedCount: 4 },
  { nameKey: 'marketing', avgWR: 65, count: 22, lowCount: 6, improvedCount: 2 },
];

const trendDataBase = [
  { monthKey: 'july', avgWR: 70 },
  { monthKey: 'august', avgWR: 72 },
  { monthKey: 'september', avgWR: 69 },
  { monthKey: 'october', avgWR: 71 },
  { monthKey: 'november', avgWR: 73 },
];

const lowPerformersBase = [
  { id: '1', name: '山田太郎', deptKey: 'development', wr: 45, trend: 'down' },
  { id: '2', name: '佐々木花子', deptKey: 'sales', wr: 38, trend: 'down' },
  { id: '3', name: '田次郎', deptKey: 'marketing', wr: 42, trend: 'stable' },
  { id: '4', name: '高橋美咲', deptKey: 'development', wr: 48, trend: 'up' },
];

export function HRDashboard({ onViewIndividual, onViewSCAnalysis, onLogout }: HRDashboardProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('3months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Translated data arrays
  const departmentData = departmentDataBase.map(item => ({
    ...item,
    name: t(`common.departments.${item.nameKey}`)
  }));

  const trendData = trendDataBase.map(item => ({
    month: t(`common.months.${item.monthKey}`),
    avgWR: item.avgWR
  }));

  const lowPerformers = lowPerformersBase.map(item => ({
    ...item,
    dept: t(`common.departments.${item.deptKey}`)
  }));

  const totalEmployees = departmentData.reduce((sum, dept) => sum + dept.count, 0);
  const avgWR = Math.round(departmentData.reduce((sum, dept) => sum + dept.avgWR * dept.count, 0) / totalEmployees);
  const totalLow = departmentData.reduce((sum, dept) => sum + dept.lowCount, 0);
  const totalImproved = departmentData.reduce((sum, dept) => sum + dept.improvedCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4FF] to-white">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#4A90E2]/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[#003E7E]">{t('hr.dashboard')}</h1>
              <p className="text-sm text-gray-600">{t('hr.wrAnalysis')}</p>
            </div>
            <Button variant="ghost" onClick={onLogout} className="text-[#4A90E2]">
              <LogOut className="w-4 h-4 mr-2" />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[20px] shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#4A90E2] mb-1">{t('hr.totalEmployees')}</p>
                <p className="text-3xl text-[#003E7E]">{totalEmployees}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#003E7E] rounded-[12px] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#72D1FF] rounded-[20px] shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#72D1FF] mb-1">{t('hr.avgWR')}</p>
                <p className="text-3xl text-[#003E7E]">{avgWR}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#72D1FF] to-[#4A90E2] rounded-[12px] flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#6EC679] rounded-[20px] shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6EC679] mb-1">{t('hr.improving')}</p>
                <p className="text-3xl text-[#003E7E]">{totalImproved}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#6EC679] to-[#4A90E2] rounded-[12px] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#BFC9D1] rounded-[20px] shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#BFC9D1] mb-1">{t('hr.needsAttention')}</p>
                <p className="text-3xl text-[#003E7E]">{totalLow}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#BFC9D1] to-[#94A3AE] rounded-[12px] flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 border-2 border-[#4A90E2]/20 rounded-[16px]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-[12px]">
              {t('hr.overview')}
            </TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-[12px]">
              {t('hr.departmentAnalysis')}
            </TabsTrigger>
            <TabsTrigger value="individuals" className="data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-[12px]">
              {t('hr.individuals')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[20px] shadow-lg">
              <h3 className="text-[#003E7E] mb-4">{t('hr.companyWRTrend')}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#AEE1F9" />
                  <XAxis dataKey="month" stroke="#003E7E" />
                  <YAxis domain={[0, 100]} stroke="#003E7E" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#E6F4FF', 
                      border: '2px solid #4A90E2',
                      borderRadius: '12px' 
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgWR"
                    stroke="#4A90E2"
                    strokeWidth={3}
                    name={t('hr.avgWR')}
                    dot={{ fill: '#72D1FF', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[20px] shadow-lg">
              <h3 className="text-[#003E7E] mb-4">{t('hr.lowPerformers')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E6F4FF]">
                      <th className="text-left py-3 px-4 text-[#003E7E]">{t('common.name')}</th>
                      <th className="text-left py-3 px-4 text-[#003E7E]">{t('common.department')}</th>
                      <th className="text-left py-3 px-4 text-[#003E7E]">{t('hr.workReadiness')}</th>
                      <th className="text-left py-3 px-4 text-[#003E7E]">{t('hr.trend')}</th>
                      <th className="text-right py-3 px-4 text-[#003E7E]">{t('common.operation')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowPerformers.map((person) => (
                      <tr key={person.id} className="border-b border-[#F5F9FB] hover:bg-[#E6F4FF]/50">
                        <td className="py-3 px-4 text-gray-900">{person.name}</td>
                        <td className="py-3 px-4 text-gray-600">{person.dept}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#E6F4FF] rounded-full h-2 max-w-[100px]">
                              <div 
                                className="bg-gradient-to-r from-[#BFC9D1] to-[#94A3AE] h-2 rounded-full"
                                style={{ width: `${person.wr}%` }}
                              />
                            </div>
                            <span className="text-gray-900">{person.wr}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {person.trend === 'down' && <TrendingDown className="w-4 h-4 text-[#BFC9D1]" />}
                          {person.trend === 'up' && <TrendingUp className="w-4 h-4 text-[#72D1FF]" />}
                          {person.trend === 'stable' && <span className="text-[#7BB7E8]">→</span>}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewIndividual(person.id)}
                            className="text-[#4A90E2] hover:bg-[#E6F4FF]"
                          >
                            {t('common.detail')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Filter Section */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[20px] shadow-lg">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#4A90E2]" />
                  <h3 className="text-[#003E7E]">{t('common.filter')}</h3>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  {/* Date Range Filter */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <label className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {t('common.period')}
                    </label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="bg-white border-2 border-[#4A90E2]/20 rounded-[12px] focus:ring-[#4A90E2]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">{t('hr.dateRange.1month')}</SelectItem>
                        <SelectItem value="3months">{t('hr.dateRange.3months')}</SelectItem>
                        <SelectItem value="6months">{t('hr.dateRange.6months')}</SelectItem>
                        <SelectItem value="1year">{t('hr.dateRange.1year')}</SelectItem>
                        <SelectItem value="all">{t('hr.dateRange.all')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Department Filter */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <label className="text-sm text-gray-600 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {t('common.department')}
                    </label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="bg-white border-2 border-[#4A90E2]/20 rounded-[12px] focus:ring-[#4A90E2]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('hr.departments.all')}</SelectItem>
                        <SelectItem value="sales">{t('common.departments.sales')}</SelectItem>
                        <SelectItem value="development">{t('common.departments.development')}</SelectItem>
                        <SelectItem value="hr">{t('common.departments.hr')}</SelectItem>
                        <SelectItem value="generalAffairs">{t('common.departments.generalAffairs')}</SelectItem>
                        <SelectItem value="marketing">{t('common.departments.marketing')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="flex items-end">
                    <Button
                      className="bg-[#4A90E2] hover:bg-[#003E7E] text-white rounded-[12px] h-10"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      {t('hr.runAnalysis')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              <div className="mt-4 pt-4 border-t border-[#E6F4FF]">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-600">{t('common.apply')}</span>
                  <div className="px-3 py-1 bg-[#E6F4FF] rounded-full text-sm text-[#003E7E]">
                    {dateRange === '1month' && t('hr.dateRange.1month')}
                    {dateRange === '3months' && t('hr.dateRange.3months')}
                    {dateRange === '6months' && t('hr.dateRange.6months')}
                    {dateRange === '1year' && t('hr.dateRange.1year')}
                    {dateRange === 'all' && t('hr.dateRange.all')}
                  </div>
                  <div className="px-3 py-1 bg-[#E6F4FF] rounded-full text-sm text-[#003E7E]">
                    {selectedDepartment === 'all' ? t('hr.departments.all') : t(`common.departments.${selectedDepartment}`)}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[20px] shadow-lg">
              <h3 className="text-[#003E7E] mb-4">{t('hr.departmentWRComparison')}</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#AEE1F9" />
                  <XAxis dataKey="name" stroke="#003E7E" />
                  <YAxis domain={[0, 100]} stroke="#003E7E" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#E6F4FF',
                      border: '2px solid #4A90E2',
                      borderRadius: '12px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="avgWR" fill="#4A90E2" name={t('hr.avgWR')} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {departmentData.map((dept, idx) => (
                <Card key={idx} className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2]/20 rounded-[16px]">
                  <h4 className="text-[#003E7E] mb-4">{dept.name}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('hr.avgWR')}</span>
                      <span className="text-[#003E7E]">{dept.avgWR}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('hr.totalEmployees')}</span>
                      <span className="text-[#003E7E]">{t('hr.headcount', { count: dept.count })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('hr.declining')}</span>
                      <span className="text-[#BFC9D1]">{t('hr.headcount', { count: dept.lowCount })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('hr.improved')}</span>
                      <span className="text-[#72D1FF]">{t('hr.headcount', { count: dept.improvedCount })}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="individuals">
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[20px] shadow-lg">
              <h3 className="text-[#003E7E] mb-4">{t('hr.individualSearch')}</h3>
              <p className="text-gray-600">{t('hr.comingSoon')}</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
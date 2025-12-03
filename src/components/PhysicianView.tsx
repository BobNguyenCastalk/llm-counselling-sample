import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { LogOut, Search, Shield, FileText, CheckCircle2, Filter, Edit2, Save, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PhysicianViewProps {
  onLogout: () => void;
}

interface ConsentedEmployee {
  id: string;
  name: string;
  department: string;
  consentDate: string;
  currentWR: number;
  riskLevel: 'high' | 'medium' | 'low';
}

const consentedEmployeesBase: Array<Omit<ConsentedEmployee, 'department'> & { departmentKey: string }> = [
  { id: '1', name: '山田太郎', departmentKey: 'development', consentDate: '2024/11/10', currentWR: 45, riskLevel: 'high' },
  { id: '2', name: '佐々木花子', departmentKey: 'sales', consentDate: '2024/11/12', currentWR: 38, riskLevel: 'high' },
  { id: '3', name: '鈴木次郎', departmentKey: 'marketing', consentDate: '2024/11/15', currentWR: 52, riskLevel: 'medium' },
];

export function PhysicianView({ onLogout }: PhysicianViewProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Translated employee data
  const consentedEmployees = consentedEmployeesBase.map(emp => ({
    ...emp,
    department: t(`common.departments.${emp.departmentKey}`)
  }));

  // Medical notes state
  const [isEditingFindings, setIsEditingFindings] = useState(false);
  const [isEditingRecommendations, setIsEditingRecommendations] = useState(false);
  const [medicalFindings, setMedicalFindings] = useState(t('mockData.medicalFindings'));
  const [recommendations, setRecommendations] = useState(`${t('mockData.recommendations.rec1')}\n${t('mockData.recommendations.rec2')}\n${t('mockData.recommendations.rec3')}\n${t('mockData.recommendations.rec4')}`);
  const [tempFindings, setTempFindings] = useState('');
  const [tempRecommendations, setTempRecommendations] = useState('');
  const [findingsLastEdited, setFindingsLastEdited] = useState<Date | null>(null);
  const [recommendationsLastEdited, setRecommendationsLastEdited] = useState<Date | null>(null);

  const formatDateTime = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };
  
  const filteredEmployees = consentedEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || emp.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const selectedData = consentedEmployees.find(e => e.id === selectedEmployee);

  const mockWRHistory = [
    { date: '10/15', wr: 68 },
    { date: '10/22', wr: 62 },
    { date: '10/29', wr: 55 },
    { date: '11/5', wr: 48 },
    { date: '11/12', wr: 45 },
    { date: '11/17', wr: 45 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-gray-900">{t('physician.title')}</h1>
              <p className="text-sm text-gray-600">{t('physician.subtitle')}</p>
            </div>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-900 mb-1">
                <strong>{t('physician.confidentiality')}</strong>
              </p>
              <p className="text-sm text-gray-700">
                {t('physician.confidentialityDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('physician.consentedEmployees')}</p>
                <p className="text-gray-900">{t('common.counters.people', { count: consentedEmployees.length })}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('physician.highRisk')}</p>
                <p className="text-gray-900">
                  {t('common.counters.people', { count: consentedEmployees.filter(e => e.riskLevel === 'high').length })}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('physician.mediumRisk')}</p>
                <p className="text-gray-900">
                  {t('common.counters.people', { count: consentedEmployees.filter(e => e.riskLevel === 'medium').length })}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-gray-900">{t('physician.consentedList')}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                {t('common.counters.people', { count: filteredEmployees.length })}
              </div>
            </div>

            {/* Risk Filter */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                <Filter className="w-4 h-4" />
                {t('physician.riskLevel')}
              </label>
              <Select value={riskFilter} onValueChange={(v) => setRiskFilter(v as any)}>
                <SelectTrigger className="bg-white border-2 border-gray-200 rounded-lg focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('physician.showAll')}</SelectItem>
                  <SelectItem value="high">{t('physician.highRiskOnly')}</SelectItem>
                  <SelectItem value="medium">{t('physician.mediumRiskOnly')}</SelectItem>
                  <SelectItem value="low">{t('physician.lowRiskOnly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => setSelectedEmployee(employee.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedEmployee === employee.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900">{employee.name}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                      employee.riskLevel === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {employee.riskLevel === 'high' ? t('physician.highRisk') :
                       employee.riskLevel === 'medium' ? t('physician.mediumRisk') : t('physician.lowRisk')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{employee.department}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('physician.consentDate')} {employee.consentDate}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <div className="md:col-span-2 space-y-6">
            {selectedEmployee && selectedData ? (
              <>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-gray-900">{selectedData.name}</h3>
                      <p className="text-sm text-gray-600">{selectedData.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{t('physician.currentWR')}</p>
                      <p className="text-gray-900">{selectedData.currentWR}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-purple-600" />
                      <p className="text-sm text-gray-900">{t('employee.consentGiven')}</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      {t('physician.consentDate')} {selectedData.consentDate} | {t('physician.expiryDate')} 2025/05/10
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">{t('physician.wrTrend')}</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={mockWRHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="wr" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Work Readiness"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">{t('physician.counselingSummary')}</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-600">{t('mockData.counselingSessions.session1Date')}</p>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{t('physician.sessionTypes.cbt')}</span>
                      </div>
                      <p className="text-gray-700">
                        {t('mockData.counselingSessions.session1Summary')}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-600">{t('mockData.counselingSessions.session2Date')}</p>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{t('physician.sessionTypes.normal')}</span>
                      </div>
                      <p className="text-gray-700">
                        {t('mockData.counselingSessions.session2Summary')}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">{t('physician.scCategorySummary')}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">{t('physician.scCategories.workload')}</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{t('physician.scLevels.high')} (35)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">{t('physician.scCategories.control')}</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">{t('physician.scLevels.somewhatLow')} (42)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">{t('physician.scCategories.supervisorSupport')}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{t('physician.scLevels.good')} (70)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">{t('physician.scCategories.relationships')}</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">{t('physician.scLevels.medium')} (58)</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">{t('physician.medicalNotes')}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Edit2 className="w-3 h-3" />
                      <span>{t('physician.clickToEdit')}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {/* Medical Findings */}
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900">🏥 {t('physician.findings')}</h4>
                        <div className="flex items-center gap-2">
                          {isEditingFindings ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setIsEditingFindings(false);
                                  setTempFindings('');
                                }}
                                className="h-8 px-2 text-gray-600 hover:text-gray-900"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setMedicalFindings(tempFindings);
                                  setIsEditingFindings(false);
                                  setFindingsLastEdited(new Date());
                                }}
                                className="h-8 px-3 bg-[#4A90E2] hover:bg-[#003E7E] text-white"
                              >
                                <Save className="w-4 h-4 mr-1" />
                                {t('common.save')}
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setTempFindings(medicalFindings);
                                setIsEditingFindings(true);
                              }}
                              className="h-8 px-3 border-red-300 text-gray-700 hover:bg-red-100"
                            >
                              <Edit2 className="w-3 h-3 mr-1" />
                              {t('common.edit')}
                            </Button>
                          )}
                        </div>
                      </div>
                      {isEditingFindings ? (
                        <Textarea
                          value={tempFindings}
                          onChange={(e) => setTempFindings(e.target.value)}
                          className="w-full min-h-[100px] bg-white border-red-300 focus:ring-2 focus:ring-red-400 rounded-lg p-3"
                          placeholder={t('physician.findingsPlaceholder')}
                        />
                      ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">{medicalFindings}</p>
                      )}
                      {findingsLastEdited && (
                        <p className="text-xs text-gray-500 mt-1">
                          {t('physician.lastEdited')} {formatDateTime(findingsLastEdited)}
                        </p>
                      )}
                    </div>

                    {/* Recommendations */}
                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900">💊 {t('hrIndividual.recommendations')}</h4>
                        <div className="flex items-center gap-2">
                          {isEditingRecommendations ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setIsEditingRecommendations(false);
                                  setTempRecommendations('');
                                }}
                                className="h-8 px-2 text-gray-600 hover:text-gray-900"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setRecommendations(tempRecommendations);
                                  setIsEditingRecommendations(false);
                                  setRecommendationsLastEdited(new Date());
                                }}
                                className="h-8 px-3 bg-[#4A90E2] hover:bg-[#003E7E] text-white"
                              >
                                <Save className="w-4 h-4 mr-1" />
                                {t('common.save')}
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setTempRecommendations(recommendations);
                                setIsEditingRecommendations(true);
                              }}
                              className="h-8 px-3 border-blue-300 text-gray-700 hover:bg-blue-100"
                            >
                              <Edit2 className="w-3 h-3 mr-1" />
                              {t('common.edit')}
                            </Button>
                          )}
                        </div>
                      </div>
                      {isEditingRecommendations ? (
                        <Textarea
                          value={tempRecommendations}
                          onChange={(e) => setTempRecommendations(e.target.value)}
                          className="w-full min-h-[120px] bg-white border-blue-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-3"
                          placeholder={t('physician.recommendationsPlaceholder')}
                        />
                      ) : (
                        <div className="text-gray-700">
                          {recommendations.split('\n').map((item, index) => (
                            <div key={index} className="flex items-start gap-2 mb-1">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {recommendationsLastEdited && (
                        <p className="text-xs text-gray-500 mt-1">
                          {t('physician.lastEdited')} {formatDateTime(recommendationsLastEdited)}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-12">
                <div className="text-center text-gray-500">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>{t('physician.selectEmployee')}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
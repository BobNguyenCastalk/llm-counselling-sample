import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LogOut, Users, Shield, Database, Settings } from 'lucide-react';

interface AdminConsoleProps {
  onLogout: () => void;
  physicianConsentThreshold?: number;
  consentReminderDays?: number;
  onUpdatePhysicianConsentThreshold?: (value: number) => void;
  onUpdateConsentReminderDays?: (value: number) => void;
}

interface Account {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'hr' | 'physician' | 'admin';
  status: 'active' | 'inactive';
  department: string;
}

const mockAccountsBase = [
  { id: '1', name: '山田太郎', email: 'yamada@company.com', role: 'employee' as const, status: 'active' as const, departmentKey: 'development' },
  { id: '2', name: '佐藤花子', email: 'sato@company.com', role: 'manager' as const, status: 'active' as const, departmentKey: 'sales' },
  { id: '3', name: '鈴木次郎', email: 'suzuki@company.com', role: 'hr' as const, status: 'active' as const, departmentKey: 'hr' },
  { id: '4', name: '高橋美咲', email: 'takahashi@company.com', role: 'physician' as const, status: 'active' as const, departmentKey: 'medicalOffice' },
];

export function AdminConsole({ onLogout, physicianConsentThreshold, consentReminderDays, onUpdatePhysicianConsentThreshold, onUpdateConsentReminderDays }: AdminConsoleProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('accounts');
  const [physicianConsentThresholdState, setPhysicianConsentThresholdState] = useState(physicianConsentThreshold || 50);
  const [consentReminderDaysState, setConsentReminderDaysState] = useState(consentReminderDays || 7);

  // Translated mock accounts
  const mockAccounts = mockAccountsBase.map(account => ({
    ...account,
    department: t(`common.departments.${account.departmentKey}`)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-gray-900">{t('admin.title')}</h1>
              <p className="text-sm text-gray-600">{t('admin.subtitle')}</p>
            </div>
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {t('common.logout')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('admin.stats.totalAccounts')}</p>
                <p className="text-gray-900">{mockAccounts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('admin.stats.active')}</p>
                <p className="text-gray-900">
                  {mockAccounts.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('admin.stats.dataCapacity')}</p>
                <p className="text-gray-900">2.4 GB</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('admin.stats.systemStatus')}</p>
                <p className="text-green-600">{t('admin.stats.normal')}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="accounts">{t('admin.tabs.accounts')}</TabsTrigger>
            <TabsTrigger value="permissions">{t('admin.tabs.permissions')}</TabsTrigger>
            <TabsTrigger value="data">{t('admin.tabs.dataRetention')}</TabsTrigger>
            <TabsTrigger value="sc-template">{t('admin.tabs.scTemplate')}</TabsTrigger>
            <TabsTrigger value="physician-consent">{t('admin.tabs.physicianConsent')}</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-900">{t('admin.accounts.list')}</h3>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  {t('admin.accounts.new')}
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-gray-700">{t('common.name')}</th>
                      <th className="text-left py-3 px-4 text-gray-700">{t('admin.accounts.email')}</th>
                      <th className="text-left py-3 px-4 text-gray-700">{t('admin.accounts.role')}</th>
                      <th className="text-left py-3 px-4 text-gray-700">{t('common.department')}</th>
                      <th className="text-left py-3 px-4 text-gray-700">{t('common.status')}</th>
                      <th className="text-right py-3 px-4 text-gray-700">{t('common.operation')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAccounts.map((account) => (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{account.name}</td>
                        <td className="py-3 px-4 text-gray-600">{account.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {account.role === 'employee' && t('admin.accounts.roles.employee')}
                            {account.role === 'manager' && t('admin.accounts.roles.manager')}
                            {account.role === 'hr' && t('admin.accounts.roles.hr')}
                            {account.role === 'physician' && t('admin.accounts.roles.physician')}
                            {account.role === 'admin' && t('admin.accounts.roles.admin')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{account.department}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            account.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {account.status === 'active' ? t('admin.accounts.status.active') : t('admin.accounts.status.inactive')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">{t('common.edit')}</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-6">{t('admin.permissions.title')}</h3>

              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <h4 className="text-gray-900 mb-4">{t('admin.accounts.roles.employee')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.avatarDialogue')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.counselingMode')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.scQuestionnaire')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.ownScore')}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h4 className="text-gray-900 mb-4">{t('admin.accounts.roles.manager')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.teamCondition')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.trendInfo')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.psychologicalInfo')}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h4 className="text-gray-900 mb-4">{t('admin.accounts.roles.hr')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.wrDetailed')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.scCategorySummary')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.behaviorData')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.rawPsychological')}</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <h4 className="text-gray-900 mb-4">{t('admin.accounts.roles.physician')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.counselingSummaryConsent')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.wrTrendConsent')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.scCategoryConsent')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span className="text-gray-700">{t('admin.permissions.features.rawHidden')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-6">{t('admin.dataRetention.retentionPeriod')}</h3>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">✅ {t('admin.dataRetention.retained')}</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>{t('admin.dataRetention.retainedItems.wrScore')}</li>
                    <li>{t('admin.dataRetention.retainedItems.scAggregated')}</li>
                    <li>{t('admin.dataRetention.retainedItems.behaviorData')}</li>
                    <li>{t('admin.dataRetention.retainedItems.counselingSummary')}</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">🗑️ {t('admin.dataRetention.notRetained')}</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>{t('admin.dataRetention.notRetainedItems.avatarRaw')}</li>
                    <li>{t('admin.dataRetention.notRetainedItems.scRaw')}</li>
                    <li>{t('admin.dataRetention.notRetainedItems.psychologicalDetail')}</li>
                    <li>{t('admin.dataRetention.notRetainedItems.voiceData')}</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-gray-900 mb-2">📊 {t('admin.dataRetention.retentionPeriod')}</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>{t('admin.dataRetention.retainedItems.wrScore')}</span>
                      <span>{t('admin.dataRetention.periods.12months')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('admin.dataRetention.retainedItems.scAggregated')}</span>
                      <span>{t('admin.dataRetention.periods.24months')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('admin.dataRetention.retainedItems.counselingSummary')}</span>
                      <span>{t('admin.dataRetention.periods.6monthsUserDeletable')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">{t('admin.dataRetention.storageUsage')}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{t('admin.dataRetention.storageTypes.wrData')}</span>
                    <span className="text-gray-900">0.8 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{t('admin.dataRetention.storageTypes.scData')}</span>
                    <span className="text-gray-900">1.2 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">{t('admin.dataRetention.storageTypes.summaryData')}</span>
                    <span className="text-gray-900">0.4 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '17%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sc-template" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-6">{t('admin.tabs.scTemplate')}</h3>

              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label>{t('admin.scTemplate.useTemplate')}</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">{t('admin.scTemplate.templates.standard')}</SelectItem>
                      <SelectItem value="short">{t('admin.scTemplate.templates.simple')}</SelectItem>
                      <SelectItem value="custom">{t('admin.scTemplate.templates.custom')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('admin.scTemplate.frequency')}</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t('admin.scTemplate.frequencies.none')}</SelectItem>
                      <SelectItem value="weekly">{t('admin.scTemplate.frequencies.weekly')}</SelectItem>
                      <SelectItem value="biweekly">{t('admin.scTemplate.frequencies.biweekly')}</SelectItem>
                      <SelectItem value="monthly">{t('admin.scTemplate.frequencies.monthly')}</SelectItem>
                      <SelectItem value="quarterly">{t('admin.scTemplate.frequencies.quarterly')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-gray-900 mb-3">{t('admin.scTemplate.currentSettings')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('admin.scTemplate.template')}</span>
                    <span className="text-gray-900">{t('admin.scTemplate.templates.standard')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('admin.scTemplate.frequency')}</span>
                    <span className="text-gray-900">{t('admin.scTemplate.frequencies.monthly')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('admin.scTemplate.nextDate')}</span>
                    <span className="text-gray-900">2024/12/01</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button>{t('admin.scTemplate.saveSettings')}</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="physician-consent" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-6">{t('admin.physicianConsent.title')}</h3>

              <div className="space-y-6">
                {/* Threshold Setting */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-gray-900 mb-4">{t('admin.physicianConsent.thresholdTitle')}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {t('admin.physicianConsent.thresholdDesc')}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="threshold">{t('admin.physicianConsent.thresholdLabel')}</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          id="threshold"
                          type="number"
                          min="0"
                          max="100"
                          value={physicianConsentThresholdState}
                          onChange={(e) => setPhysicianConsentThresholdState(Number(e.target.value))}
                          className="w-32"
                        />
                        <span className="text-gray-600">{t('admin.physicianConsent.belowThreshold')}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-gray-600 mb-1">{t('admin.physicianConsent.currentSetting')}</p>
                        <p className="text-2xl text-blue-600">{physicianConsentThresholdState}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reminder Period Setting */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="text-gray-900 mb-4">{t('admin.physicianConsent.redisplayTitle')}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {t('admin.physicianConsent.redisplayDesc')}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="reminder">{t('admin.physicianConsent.redisplayDays')}</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          id="reminder"
                          type="number"
                          min="1"
                          max="30"
                          value={consentReminderDaysState}
                          onChange={(e) => setConsentReminderDaysState(Number(e.target.value))}
                          className="w-32"
                        />
                        <span className="text-gray-600">{t('admin.physicianConsent.daysLater')}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-gray-600 mb-1">{t('admin.physicianConsent.currentSetting')}</p>
                        <p className="text-2xl text-purple-600">{t('common.counters.days', { count: consentReminderDaysState })}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview & Examples */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="text-gray-900 mb-4">{t('admin.physicianConsent.examples')}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700">{t('admin.physicianConsent.standard')}</p>
                        <p className="text-xs text-gray-500">{t('admin.physicianConsent.standardDesc')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{t('admin.physicianConsent.standardValue')}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700">{t('admin.physicianConsent.proactive')}</p>
                        <p className="text-xs text-gray-500">{t('admin.physicianConsent.proactiveDesc')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{t('admin.physicianConsent.proactiveValue')}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700">{t('admin.physicianConsent.conservative')}</p>
                        <p className="text-xs text-gray-500">{t('admin.physicianConsent.conservativeDesc')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{t('admin.physicianConsent.conservativeValue')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Settings Summary */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-gray-900 mb-3">{t('admin.physicianConsent.summary')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('admin.physicianConsent.displayCondition')}</span>
                      <span className="text-gray-900">{t('admin.physicianConsent.wrBelow', { value: physicianConsentThresholdState })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('admin.physicianConsent.redisplayTiming')}</span>
                      <span className="text-gray-900">{t('admin.physicianConsent.afterDecline', { days: consentReminderDaysState })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('admin.physicianConsent.lastUpdated')}</span>
                      <span className="text-gray-900">2024/11/17</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                  if (onUpdatePhysicianConsentThreshold && onUpdateConsentReminderDays) {
                    onUpdatePhysicianConsentThreshold(physicianConsentThresholdState);
                    onUpdateConsentReminderDays(consentReminderDaysState);
                  }
                }}>{t('common.save')}</Button>
                <Button variant="outline">{t('admin.physicianConsent.resetDefault')}</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
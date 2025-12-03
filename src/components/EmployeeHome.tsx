import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageSquare, Heart, FileText, LogOut, Shield, CheckCircle2 } from 'lucide-react';
import { AIAvatar } from './AIAvatar';
import { PhysicianConsentDialog } from './PhysicianConsentDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';

interface EmployeeHomeProps {
  userName: string;
  scQuestionnaireCompleted: boolean;
  workReadiness: number;
  physicianConsentGiven: boolean;
  showConsentDialog: boolean;
  showSCReminderDialog?: boolean;
  scFrequency?: 'none' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  lastSCCompletionDate?: Date | null;
  onStartDialogue: () => void;
  onStartCounseling: () => void;
  onStartQuestionnaire: () => void;
  onViewConversationHistory: () => void;
  onPhysicianConsent: () => void;
  onPhysicianConsentDecline: () => void;
  onSCReminderAccept?: () => void;
  onSCReminderDecline?: () => void;
  onLogout: () => void;
}

export function EmployeeHome({
  userName,
  scQuestionnaireCompleted,
  workReadiness,
  physicianConsentGiven,
  showConsentDialog,
  showSCReminderDialog,
  scFrequency,
  lastSCCompletionDate,
  onStartDialogue,
  onStartCounseling,
  onStartQuestionnaire,
  onViewConversationHistory,
  onPhysicianConsent,
  onPhysicianConsentDecline,
  onSCReminderAccept,
  onSCReminderDecline,
  onLogout
}: EmployeeHomeProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4FF] to-white relative">
      {/* Tree illustration background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute bottom-0 left-0 w-64 h-64" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="140" r="40" fill="#6EC679" />
          <rect x="90" y="140" width="20" height="60" fill="#4A90E2" />
        </svg>
        <svg className="absolute top-20 right-20 w-48 h-48" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="120" r="30" fill="#6EC679" />
          <rect x="92" y="120" width="16" height="50" fill="#4A90E2" />
        </svg>
      </div>

      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#4A90E2]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-[#003E7E]">{t('login.title')}</h1>
          <Button variant="ghost" onClick={onLogout} className="text-[#4A90E2] hover:text-[#003E7E]">
            <LogOut className="w-4 h-4 mr-2" />
            {t('common.logout')}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-[#003E7E] mb-2">{t('employee.greeting', { name: userName })}</h2>
          <p className="text-gray-600">{t('employee.todayMessage')}</p>
        </div>

        <div className="mb-16">
          <Card className="p-10 bg-white/90 backdrop-blur-sm rounded-[20px] shadow-[0_4px_20px_rgba(74,144,226,0.12)]">
            <div className="flex flex-col items-center">
              <AIAvatar mood="neutral" size="large" />
              
              <div className="mt-8 flex gap-4">
                <Button onClick={onStartDialogue} size="lg" className="rounded-xl bg-[#4A90E2] hover:bg-[#003E7E] shadow-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {t('employee.talkToAvatar')}
                </Button>
                <Button
                  onClick={onStartCounseling}
                  disabled={!scQuestionnaireCompleted}
                  variant={scQuestionnaireCompleted ? "outline" : "ghost"}
                  size="lg"
                  className={`rounded-xl ${
                    scQuestionnaireCompleted
                      ? 'border-[#4A90E2] text-[#4A90E2] hover:bg-[#E6F4FF]'
                      : 'opacity-50 cursor-not-allowed border-[#BFC9D1] text-[#BFC9D1]'
                  }`}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t('employee.counselingMode')}
                  {!scQuestionnaireCompleted && <span className="ml-2 text-xs">🔒</span>}
                </Button>
              </div>

              {!scQuestionnaireCompleted && (
                <div className="mt-6 p-4 bg-[#E6F4FF] rounded-[12px] max-w-md">
                  <p className="text-sm text-[#003E7E] text-center">
                    ⚠️ {t('employee.counselingLocked')}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="grid gap-4">
          <h3 className="text-[#003E7E]">{t('employee.menu')}</h3>

          {/* Physician Consent Status Card */}
          {physicianConsentGiven && (
            <Card className="p-6 rounded-[16px] bg-gradient-to-br from-[#E6F4FF] to-white border-2 border-[#6EC679]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#6EC679] to-[#4A90E2] rounded-[12px] flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[#003E7E]">{t('employee.physicianSupport')}</h4>
                    <div className="px-3 py-1 bg-[#6EC679] text-white text-xs rounded-full">
                      {t('employee.consentGiven')}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('employee.physicianSupportDesc')}
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer rounded-[16px] bg-white/90 backdrop-blur-sm border-[#4A90E2]/10" onClick={onViewConversationHistory}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#4A90E2]/70 rounded-[12px] flex items-center justify-center shadow-md">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#003E7E]">{t('employee.pastConversations')}</h4>
                  <p className="text-gray-600">{t('employee.pastConversationsDesc')}</p>
                </div>
              </div>
              <div className="text-[#4A90E2]">›</div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer rounded-[16px] bg-white/90 backdrop-blur-sm border-[#4A90E2]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#6EC679] to-[#6EC679]/70 rounded-[12px] flex items-center justify-center shadow-md">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#003E7E]">{t('employee.counselingHistory')}</h4>
                  <p className="text-gray-600">{t('employee.counselingHistoryDesc')}</p>
                </div>
              </div>
              <div className="text-[#4A90E2]">›</div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-lg transition-all cursor-pointer rounded-[16px] border-2 border-[#AEE1F9] bg-gradient-to-br from-[#E6F4FF] to-white"
            onClick={onStartQuestionnaire}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#7BB7E8] to-[#4A90E2] rounded-[12px] flex items-center justify-center shadow-md">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#003E7E]">{t('employee.scQuestionnaire')}</h4>
                  <p className="text-gray-600">{scQuestionnaireCompleted ? t('employee.scAnswered') : t('employee.scUnanswered')}</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-[#4A90E2] text-white rounded-[12px] shadow-md">
                {t('employee.answerButton')}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-[#E6F4FF]/50 rounded-[16px] border border-[#4A90E2]/20 backdrop-blur-sm">
          <p className="text-sm text-[#003E7E]">
            {t('employee.privacyNotice')}
          </p>
        </div>
      </main>

      {/* Physician Consent Dialog */}
      <PhysicianConsentDialog
        isOpen={showConsentDialog}
        workReadiness={workReadiness}
        onConsent={onPhysicianConsent}
        onDecline={onPhysicianConsentDecline}
      />

      {/* SC Reminder Dialog */}
      {showSCReminderDialog && (
        <Dialog open={showSCReminderDialog} onOpenChange={(open) => { if (!open && onSCReminderDecline) onSCReminderDecline(); }}>
          <DialogContent className="max-w-md rounded-[20px]">
            <DialogHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-[#7BB7E8] to-[#4A90E2] rounded-[16px] flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-center text-[#003E7E]">{t('employee.scReminderTitle')}</DialogTitle>
              <DialogDescription className="text-center">
                <div className="space-y-3 mt-4">
                  <p className="text-gray-700">
                    {t('employee.scReminderDesc')}
                  </p>

                  {scFrequency && scFrequency !== 'none' && (
                    <div className="p-4 bg-[#E6F4FF] rounded-[12px] space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('employee.frequency')}</span>
                        <span className="text-[#003E7E]">
                          {t(`admin.scTemplate.frequencies.${scFrequency}`)}
                        </span>
                      </div>
                      {lastSCCompletionDate && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('employee.lastDate')}</span>
                          <span className="text-[#003E7E]">
                            {lastSCCompletionDate.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-3 bg-[#6EC679]/10 border border-[#6EC679]/30 rounded-[12px]">
                    <p className="text-xs text-[#003E7E]">
                      💚 {t('employee.duration')}<br />
                      🔒 {t('employee.dataProtection')}
                    </p>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                onClick={() => {
                  if (onSCReminderAccept) onSCReminderAccept();
                }}
                className="w-full bg-[#4A90E2] hover:bg-[#003E7E] text-white rounded-[12px] shadow-lg"
                size="lg"
              >
                {t('employee.answerNow')}
              </Button>
              <Button
                onClick={() => {
                  if (onSCReminderDecline) onSCReminderDecline();
                }}
                variant="outline"
                className="w-full border-[#BFC9D1] text-gray-700 hover:bg-gray-100 rounded-[12px]"
              >
                {t('employee.answerLater')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
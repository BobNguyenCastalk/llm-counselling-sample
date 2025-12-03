import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AlertCircle, Shield, Eye, Lock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface PhysicianConsentDialogProps {
  isOpen: boolean;
  onConsent: () => void;
  onDecline: () => void;
  workReadiness: number;
}

export function PhysicianConsentDialog({
  isOpen,
  onConsent,
  onDecline,
  workReadiness
}: PhysicianConsentDialogProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] bg-white/95 backdrop-blur-sm border-2 border-[#4A90E2] rounded-[24px] flex flex-col">
        <AlertDialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#72D1FF] rounded-[16px] flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-2xl text-[#003E7E]">
                {t('physicianConsent.title')}
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-gray-700">
            {t('physicianConsent.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-[#4A90E2] scrollbar-track-gray-100">
          {/* Alert Notice */}
          <Card className="p-4 bg-[#E6F4FF] border-2 border-[#4A90E2] rounded-[16px]">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-[#4A90E2] flex-shrink-0 mt-1" />
              <div>
                <p className="text-[#003E7E]" dangerouslySetInnerHTML={{
                  __html: t('physicianConsent.alertMessage', { score: workReadiness })
                }} />
              </div>
            </div>
          </Card>

          {/* Support Offer */}
          <div className="space-y-3">
            <h4 className="text-[#003E7E]">{t('physicianConsent.supportOffer')}</h4>
            <p className="text-gray-700">
              {t('physicianConsent.supportDesc1')}
            </p>
            <p className="text-gray-700">
              {t('physicianConsent.supportDesc2')}
            </p>
          </div>

          {/* What data will be shared */}
          <Card className="p-4 bg-white border-2 border-[#4A90E2]/20 rounded-[16px]">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#4A90E2]" />
                <h4 className="text-[#003E7E]">{t('physicianConsent.sharedData')}</h4>
              </div>
              <span className="text-[#4A90E2] text-xl">{showDetails ? '−' : '+'}</span>
            </button>

            {showDetails && (
              <div className="mt-4 space-y-2 text-sm text-gray-700 pl-7">
                <p>✓ {t('physicianConsent.sharedDataItems.wrTrend')}</p>
                <p>✓ {t('physicianConsent.sharedDataItems.conditionDetails')}</p>
                <p>✓ {t('physicianConsent.sharedDataItems.scResults')}</p>
                <p>✓ {t('physicianConsent.sharedDataItems.conversationSummary')}</p>
                <p className="text-[#4A90E2] mt-3">
                  ※ {t('physicianConsent.rawNotIncluded')}
                </p>
              </div>
            )}
          </Card>

          {/* Privacy Protection */}
          <Card className="p-4 bg-[#E6F4FF]/50 border-2 border-[#4A90E2]/20 rounded-[16px]">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#6EC679] flex-shrink-0 mt-0.5" />
              <div className="text-sm space-y-2">
                <p className="text-[#003E7E]">
                  <strong>{t('physicianConsent.privacyTitle')}</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• {t('physicianConsent.privacyItems.confidentiality')}</li>
                  <li>• {t('physicianConsent.privacyItems.noSharing')}</li>
                  <li>• {t('physicianConsent.privacyItems.revocable')}</li>
                  <li>• {t('physicianConsent.privacyItems.noDisadvantage')}</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="text-sm text-gray-600 text-center pt-2">
            {t('physicianConsent.confirmQuestion')}
          </div>
        </div>

        <AlertDialogFooter className="flex gap-3 mt-4">
          <AlertDialogCancel
            onClick={onDecline}
            className="bg-white border-2 border-[#BFC9D1] text-[#003E7E] hover:bg-[#F5F9FB] rounded-[12px] px-6"
          >
            {t('physicianConsent.decline')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConsent}
            className="bg-gradient-to-r from-[#4A90E2] to-[#72D1FF] text-white hover:from-[#003E7E] hover:to-[#4A90E2] rounded-[12px] px-8 shadow-lg"
          >
            {t('physicianConsent.consent')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
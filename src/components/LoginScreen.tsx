import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type UserRole = 'employee' | 'manager' | 'hr' | 'physician' | 'admin';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo: Determine role based on email
    if (email.includes('hr')) {
      onLogin('hr');
    } else if (email.includes('manager')) {
      onLogin('manager');
    } else if (email.includes('doctor') || email.includes('physician')) {
      onLogin('physician');
    } else if (email.includes('admin')) {
      onLogin('admin');
    } else {
      onLogin('employee');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F4FF] via-[#4A90E2]/10 to-[#6EC679]/5 relative overflow-hidden">
      {/* Decorative light particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#4A90E2]/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-40 w-3 h-3 bg-[#6EC679]/40 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-[#4A90E2]/20 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-[#6EC679]/30 rounded-full animate-pulse delay-300" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-[20px] shadow-[0_4px_16px_rgba(74,144,226,0.15)] p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#6EC679] rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-gray-900 mb-3">{t('login.title')}</h1>
            <p className="text-gray-600">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#003E7E]">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@company.com"
                className="rounded-xl h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#003E7E]">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl h-12"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl bg-[#4A90E2] hover:bg-[#003E7E] transition-all shadow-lg">
              {t('login.loginButton')}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            <p className="mb-3">{t('login.demoAccounts')}</p>
            <div className="space-y-1 text-xs">
              <p>{t('login.employee')}</p>
              <p>{t('login.manager')}</p>
              <p>{t('login.hr')}</p>
              <p>{t('login.physician')}</p>
              <p>{t('login.admin')}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-6 text-sm">
            <a href="#" className="text-[#4A90E2] hover:text-[#003E7E] transition-colors">{t('login.terms')}</a>
            <a href="#" className="text-[#4A90E2] hover:text-[#003E7E] transition-colors">{t('login.privacy')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server on port 3000 (auto-opens browser)
pnpm build      # Build to ./build directory
```

## Architecture

This is a React 18 + Vite frontend for an LLM-powered employee counseling/wellness application. The app has no backend connection - it's a UI prototype with mock data and simulated responses.

### Navigation State Machine
All navigation is controlled via `App.tsx` with TypeScript types:
- `UserRole`: `employee | manager | hr | physician | admin`
- `Screen`: `login | employee-home | avatar-dialogue | counseling | sc-questionnaire | conversation-history | manager-dashboard | manager-individual | hr-dashboard | hr-individual | sc-analysis | physician | admin`

Feature components receive navigation callbacks as props (e.g., `onBack`, `onNavigate`). All state is lifted to `App.tsx`.

### User Roles
- **Employee**: Home dashboard, avatar dialogue (normal chat), counseling mode (mental health), SC questionnaire, conversation history
- **Manager**: Team dashboard, individual employee views
- **HR**: Department dashboard, individual views, SC group analysis
- **Physician**: Patient view with consented data access
- **Admin**: System configuration (consent thresholds, reminder intervals)

### i18n / Localization
Language controlled by `VITE_LANG` env variable (`ja` or `en`, default: `en`). Translation files in `src/i18n/locales/`. Use the `useTranslation` hook from `react-i18next`:
```tsx
const { t } = useTranslation();
t('common.defaultUsername')
```

### Key Patterns

**Path Alias**: Use `@/` to import from `src/` (configured in vite.config.ts)

**UI Components**: Located in `src/components/ui/` - shadcn/ui-style components built on Radix UI primitives. Use these for consistent styling.

**Utility Function**: Use `cn()` from `@/components/ui/utils` for conditional Tailwind class merging:
```tsx
import { cn } from '@/components/ui/utils';
cn('base-class', condition && 'conditional-class')
```

### Important Business Logic
- **Physician Consent Flow**: When employee Work Readiness score falls below configurable threshold, a consent dialog prompts for physician data sharing
- **SC Questionnaire Scheduling**: Configurable frequency (weekly/biweekly/monthly/quarterly) with reminder dialogs and decline cooldowns
- **Counseling vs Normal Dialogue**: Two distinct avatar interaction modes with different UI treatments

## Active Technologies
- TypeScript (strict mode) with React 18 + React 18, Vite, Tailwind CSS, Radix UI, react-i18next, Recharts (for charts) (001-mobile-first-refactor)
- N/A (UI prototype with hardcoded mock data) (001-mobile-first-refactor)

## Recent Changes
- 001-mobile-first-refactor: Added TypeScript (strict mode) with React 18 + React 18, Vite, Tailwind CSS, Radix UI, react-i18next, Recharts (for charts)

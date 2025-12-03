# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server on port 3000 (auto-opens browser)
pnpm build      # Build to ./build directory
```

## Architecture

This is a React 18 + Vite frontend for an LLM-powered employee counseling/wellness application (Japanese UI). The app has no backend connection - it's a UI prototype with mock data and simulated responses.

### User Roles and Screens
The app implements role-based navigation from a single `App.tsx` state machine:
- **Employee**: Home dashboard, avatar dialogue (normal chat), counseling mode (mental health), SC questionnaire, conversation history
- **Manager**: Team dashboard, individual employee views
- **HR**: Department dashboard, individual views, SC group analysis
- **Physician**: Patient view with consented data access
- **Admin**: System configuration (consent thresholds, reminder intervals)

### Key Patterns

**Path Alias**: Use `@/` to import from `src/` (configured in vite.config.ts)

**UI Components**: Located in `src/components/ui/` - these are shadcn/ui-style components built on Radix UI primitives. Use these for consistent styling.

**Utility Function**: Use `cn()` from `@/components/ui/utils` for conditional Tailwind class merging:
```tsx
import { cn } from '@/components/ui/utils';
cn('base-class', condition && 'conditional-class')
```

**Component Structure**: Feature components in `src/components/` receive navigation callbacks as props (e.g., `onBack`, `onNavigate`). State is lifted to `App.tsx`.

### Important Business Logic
- **Physician Consent Flow**: When employee Work Readiness score falls below configurable threshold, a consent dialog prompts for physician data sharing
- **SC Questionnaire Scheduling**: Configurable frequency (weekly/biweekly/monthly/quarterly) with reminder dialogs and decline cooldowns
- **Counseling vs Normal Dialogue**: Two distinct avatar interaction modes with different UI treatments

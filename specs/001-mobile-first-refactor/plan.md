# Implementation Plan: Mobile-First Refactor

**Branch**: `001-mobile-first-refactor` | **Date**: 2025-12-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-mobile-first-refactor/spec.md`

## Summary

This feature implements a two-phase refactoring effort:

1. **Phase 1 - SOLID Restructure**: Reorganize the existing React codebase to follow SOLID principles with a feature/domain-based folder structure (screens/, features/, components/shared/)
2. **Phase 2 - Mobile-First Responsive**: Apply mobile-first responsive design using Tailwind CSS breakpoints for all user roles except admin

The approach ensures architectural cleanliness before adding responsive complexity, with integration tests (Cypress) written before responsive implementation.

## Technical Context

**Language/Version**: TypeScript (strict mode) with React 18
**Primary Dependencies**: React 18, Vite, Tailwind CSS, Radix UI, react-i18next, Recharts (for charts)
**Storage**: N/A (UI prototype with hardcoded mock data)
**Testing**: Cypress for integration tests (Phase 2 only), code review for SOLID compliance (Phase 1)
**Target Platform**: Web (responsive: mobile 320-767px, tablet 768-1023px, desktop 1024px+)
**Project Type**: Single frontend project (React SPA)
**Performance Goals**: First meaningful paint < 3s on 3G, smooth layout transitions on rotation
**Constraints**: No horizontal scrolling on mobile/tablet, touch targets >= 44px, admin console unchanged
**Scale/Scope**: 13 screens, 5 user roles, 3 breakpoints

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Test-First Development | ✅ PASS | Phase 2 uses TDD with Cypress - tests written before responsive implementation. Phase 1 (SOLID) uses code review per clarification. |
| II. Type Safety | ✅ PASS | All new/refactored components will maintain TypeScript strict mode. No new `any` types. |
| III. Component Architecture | ✅ PASS | Restructure aligns: shared UI → `src/components/shared/`, using `cn()`, props-based navigation. |
| IV. Internationalization | ✅ PASS | No new user-facing strings; existing i18n preserved. |
| V. Simplicity (YAGNI) | ✅ PASS | Only implementing required responsive behavior. No new features. |

**Gate Result**: PASS - All constitution principles satisfied.

## Project Structure

### Documentation (this feature)

```text
specs/001-mobile-first-refactor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this feature - no API changes)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

**Current Structure** (before refactor):
```text
src/
├── components/
│   ├── ui/              # Radix-based UI primitives
│   ├── figma/           # Figma-generated components
│   ├── LoginScreen.tsx
│   ├── EmployeeHome.tsx
│   ├── AvatarDialogue.tsx
│   ├── CounselingMode.tsx
│   ├── SCQuestionnaire.tsx
│   ├── ConversationHistory.tsx
│   ├── ManagerDashboard.tsx
│   ├── ManagerIndividualView.tsx
│   ├── HRDashboard.tsx
│   ├── HRIndividual.tsx
│   ├── SCGroupAnalysis.tsx
│   ├── PhysicianView.tsx
│   ├── AdminConsole.tsx
│   └── [other components]
├── i18n/
│   └── locales/
├── App.tsx
└── main.tsx
```

**Target Structure** (after Phase 1 SOLID refactor):
```text
src/
├── screens/                    # Route-level components (one per screen)
│   ├── LoginScreen.tsx
│   ├── employee/
│   │   ├── EmployeeHomeScreen.tsx
│   │   ├── AvatarDialogueScreen.tsx
│   │   ├── CounselingScreen.tsx
│   │   ├── SCQuestionnaireScreen.tsx
│   │   └── ConversationHistoryScreen.tsx
│   ├── manager/
│   │   ├── ManagerDashboardScreen.tsx
│   │   └── ManagerIndividualScreen.tsx
│   ├── hr/
│   │   ├── HRDashboardScreen.tsx
│   │   ├── HRIndividualScreen.tsx
│   │   └── SCGroupAnalysisScreen.tsx
│   ├── physician/
│   │   └── PhysicianScreen.tsx
│   └── admin/
│       └── AdminConsoleScreen.tsx
├── features/                   # Domain-specific logic and composed components
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── employee/
│   │   ├── WellnessCard.tsx
│   │   ├── QuestionnaireProgress.tsx
│   │   └── ConversationList.tsx
│   ├── dialogue/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── AIAvatar.tsx
│   ├── manager/
│   │   ├── TeamSummaryCard.tsx
│   │   └── EmployeeWellnessView.tsx
│   ├── hr/
│   │   ├── DepartmentAnalytics.tsx
│   │   └── SCAnalysisChart.tsx
│   ├── physician/
│   │   └── PatientDataView.tsx
│   └── consent/
│       ├── PhysicianConsentDialog.tsx
│       └── SCReminderDialog.tsx
├── components/                 # Reusable UI components
│   ├── shared/                 # Shared reusable UI primitives (per constitution)
│   │   ├── layout/
│   │   │   ├── ResponsiveContainer.tsx
│   │   │   └── ScreenWrapper.tsx
│   │   ├── feedback/
│   │   │   ├── TrendIndicator.tsx
│   │   │   └── FaceIcon.tsx
│   │   └── charts/
│   │       └── ResponsiveChart.tsx
│   ├── ui/                     # Radix-based primitives (existing)
│   └── figma/                  # Figma-generated components (existing)
├── hooks/                      # Custom React hooks
│   ├── useBreakpoint.ts
│   └── useDialogVisibility.ts
├── types/                      # TypeScript type definitions
│   └── index.ts
├── i18n/
│   └── locales/
├── App.tsx
└── main.tsx

cypress/
├── e2e/
│   ├── employee/
│   │   ├── home.cy.ts
│   │   ├── dialogue.cy.ts
│   │   └── questionnaire.cy.ts
│   ├── manager/
│   │   └── dashboard.cy.ts
│   ├── hr/
│   │   └── dashboard.cy.ts
│   ├── physician/
│   │   └── patient-view.cy.ts
│   └── responsive/
│       ├── mobile.cy.ts
│       ├── tablet.cy.ts
│       └── desktop.cy.ts
├── fixtures/
│   └── test-data.json
└── support/
    └── commands.ts
```

**Structure Decision**: Feature/domain-based organization (screens/, features/, components/shared/) as specified in clarifications. Shared UI components reside in `src/components/shared/` per constitution. The existing `ui/` and `figma/` folders remain under `components/`.

## Complexity Tracking

> **No constitution violations requiring justification.**

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Shared components path | `components/shared/` | Aligns with constitution requirement for shared UI location |
| Phase 1 no tests | Code review only | Per clarification - SOLID is architectural, verified by review |
| Admin unchanged | Excluded from responsive | Per spec - admin is desktop-only |

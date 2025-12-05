# Tasks: Mobile-First Refactor

**Branch**: `001-mobile-first-refactor` | **Date**: 2025-12-05 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Task Summary

| Phase | Tasks | Priority | Description |
|-------|-------|----------|-------------|
| Phase 1 | 8 | P0 | Setup & Infrastructure |
| Phase 2 | 20 | P0 | SOLID Restructure (US0) |
| Phase 3 | 8 | P1 | Cypress Setup & Test Infrastructure (US9) |
| Phase 4 | 18 | P1 | Employee Mobile + Desktop Preservation (US1, US6) |
| Phase 5 | 11 | P2 | Manager & HR Mobile (US2, US3) |
| Phase 6 | 6 | P2 | iPad/Tablet Support (US5) |
| Phase 7 | 6 | P3 | Physician Mobile + Admin (US4, US7) |
| Phase 8 | 8 | P1 | Modal/Dialog Behavior (US8) |
| Final | 4 | - | Polish & Documentation |

**Total Tasks**: 89

---

## Phase 1: Setup & Infrastructure (P0)

- [ ] [T001] [P0] Create feature branch `001-mobile-first-refactor` from main
- [ ] [T002] [P0] Create target folder structure: `src/screens/`, `src/features/`, `src/components/shared/`
- [ ] [T003] [P0] Create `src/hooks/` directory for custom hooks
- [ ] [T004] [P0] Create `src/services/api/` directory for API client
- [ ] [T005] [P0] Create `src/types/index.ts` for shared TypeScript types
- [ ] [T006] [P0] Update `tsconfig.json` path aliases if needed for new structure
- [ ] [T007] [P0] Create `cypress/` directory structure: `e2e/`, `fixtures/`, `support/`
- [ ] [T008] [P0] Install Cypress as dev dependency: `pnpm add -D cypress`

---

## Phase 2: SOLID Restructure (P0) - US0

### 2.1 Core Hooks & Services

- [ ] [T009] [P0] [US0] Create `src/services/api/apiClient.ts` with `apiRequest()` function and `api.*` method callers
- [ ] [T010] [P0] [US0] Create `src/hooks/useApi.ts` with `useApi()` and `useApiMutation()` hooks, re-export `api`
- [ ] [T011] [P0] [US0] Create `src/hooks/useBreakpoint.ts` with `useBreakpoint()`, `useIsMobile()`, `useIsTablet()`, `useIsDesktop()`
- [ ] [T012] [P0] [US0] Create `src/hooks/useDialogVisibility.ts` with visibility state and `shouldExecuteLogic` flag

### 2.2 Shared Components

- [ ] [T013] [P0] [US0] Create `src/components/shared/layout/ResponsiveContainer.tsx` - wrapper for responsive layouts
- [ ] [T014] [P0] [US0] Create `src/components/shared/layout/ScreenWrapper.tsx` - common screen wrapper with padding/max-width
- [ ] [T015] [P0] [US0] Create `src/components/shared/feedback/TrendIndicator.tsx` - extract from existing dashboards
- [ ] [T016] [P0] [US0] Create `src/components/shared/feedback/FaceIcon.tsx` - extract emoji/mood indicators
- [ ] [T017] [P0] [US0] Create `src/components/shared/charts/ResponsiveChart.tsx` - wrapper for Recharts with responsive sizing

### 2.3 Screen Components Relocation

- [ ] [T018] [P0] [US0] Move `LoginScreen.tsx` to `src/screens/LoginScreen.tsx`, update imports
- [ ] [T019] [P0] [US0] Move employee screens to `src/screens/employee/`: EmployeeHomeScreen, AvatarDialogueScreen, CounselingScreen, SCQuestionnaireScreen, ConversationHistoryScreen
- [ ] [T020] [P0] [US0] Move manager screens to `src/screens/manager/`: ManagerDashboardScreen, ManagerIndividualScreen
- [ ] [T021] [P0] [US0] Move HR screens to `src/screens/hr/`: HRDashboardScreen, HRIndividualScreen, SCGroupAnalysisScreen
- [ ] [T022] [P0] [US0] Move physician screen to `src/screens/physician/PhysicianScreen.tsx`
- [ ] [T023] [P0] [US0] Move admin screen to `src/screens/admin/AdminConsoleScreen.tsx`

### 2.4 Feature Components Extraction

- [ ] [T024] [P0] [US0] Extract `src/features/auth/LoginForm.tsx` from LoginScreen
- [ ] [T025] [P0] [US0] Extract `src/features/dialogue/ChatInterface.tsx`, `MessageBubble.tsx`, `AIAvatar.tsx` from AvatarDialogue
- [ ] [T026] [P0] [US0] Extract `src/features/consent/PhysicianConsentDialog.tsx` and `SCReminderDialog.tsx`
- [ ] [T027] [P0] [US0] Update `src/App.tsx` imports to use new screen paths
- [ ] [T028] [P0] [US0] Verify all imports resolve correctly, run `pnpm build` to check

---

## Phase 3: Cypress Setup & Test Infrastructure (P1) - US9

> **TDD Approach**: Tests MUST be written before responsive implementation begins. All subsequent phases will run tests to verify implementation.

### 3.1 Cypress Configuration

- [ ] [T029] [P1] [US9] Configure Cypress in `cypress.config.ts` with base URL and viewport defaults
- [ ] [T030] [P1] [US9] Create `cypress/fixtures/viewports.json` with mobile (375x667), tablet (768x1024), desktop (1280x800)
- [ ] [T031] [P1] [US9] Create `cypress/fixtures/test-data.json` with mock data for all user roles
- [ ] [T032] [P1] [US9] Create `cypress/support/commands.ts` with custom assertions for touch targets and horizontal scroll

### 3.2 Responsive Test Suites (Written Before Implementation)

- [ ] [T033] [P1] [US9] Create `cypress/e2e/responsive/mobile.cy.ts` - no horizontal scroll tests at 375px for all screens
- [ ] [T034] [P1] [US9] Create `cypress/e2e/responsive/tablet.cy.ts` - layout tests at 768px for all screens
- [ ] [T035] [P1] [US9] Create `cypress/e2e/responsive/desktop.cy.ts` - desktop preservation tests at 1280px
- [ ] [T036] [P1] [US9] Create `cypress/e2e/responsive/touch-targets.cy.ts` - touch target validation (>= 44px)

---

## Phase 4: Employee Mobile & Desktop Preservation (P1) - US1, US6

> **Run Tests**: After each sub-phase, run `pnpm cypress run --spec "cypress/e2e/responsive/**"` to verify implementation

### 4.1 Login Screen Responsive

- [ ] [T037] [P1] [US1] Add mobile-first Tailwind classes to `src/screens/LoginScreen.tsx` - stack form vertically on mobile
- [ ] [T038] [P1] [US1] Ensure login form touch targets >= 44px: `min-h-11 min-w-11` on buttons/inputs
- [ ] [T039] [P1] [US6] Verify desktop layout preserved at 1280px+ viewport
- [ ] [T040] [P1] [US1] **RUN TESTS**: Verify login screen passes mobile/tablet/desktop tests

### 4.2 Employee Home Screen Responsive

- [ ] [T041] [P1] [US1] Update `src/screens/employee/EmployeeHomeScreen.tsx` - single column on mobile, multi-column on desktop
- [ ] [T042] [P1] [US1] Apply touch-friendly sizing to navigation buttons and cards
- [ ] [T043] [P1] [US6] Preserve existing desktop card layout at lg: breakpoint
- [ ] [T044] [P1] [US1] **RUN TESTS**: Verify employee home passes responsive tests

### 4.3 Avatar Dialogue Responsive

- [ ] [T045] [P1] [US1] Update `src/screens/employee/AvatarDialogueScreen.tsx` - full-screen chat on mobile
- [ ] [T046] [P1] [US1] Position send button for easy thumb reach on mobile (bottom right, >= 44px)
- [ ] [T047] [P1] [US1] Ensure message bubbles have appropriate mobile padding/margins
- [ ] [T048] [P1] [US6] Maintain desktop chat proportions at lg: breakpoint
- [ ] [T049] [P1] [US1] **RUN TESTS**: Verify avatar dialogue passes responsive tests

### 4.4 SC Questionnaire & Counseling Responsive

- [ ] [T050] [P1] [US1] Update `src/screens/employee/CounselingScreen.tsx` with mobile-first layout
- [ ] [T051] [P1] [US1] Update `src/screens/employee/SCQuestionnaireScreen.tsx` - full-width form on mobile
- [ ] [T052] [P1] [US1] Ensure progress indicator visible and touch-friendly, apply min-h-11 to form inputs
- [ ] [T053] [P1] [US1] **RUN TESTS**: Verify counseling and questionnaire pass responsive tests

### 4.5 Conversation History Responsive

- [ ] [T054] [P1] [US1] Update `src/screens/employee/ConversationHistoryScreen.tsx` - stack list items vertically
- [ ] [T055] [P1] [US1] Add touch-friendly spacing (py-3 px-4) to list items
- [ ] [T056] [P1] [US6] Preserve desktop list layout at lg: breakpoint
- [ ] [T057] [P1] [US1] **RUN TESTS**: Verify conversation history passes responsive tests

---

## Phase 5: Manager & HR Mobile (P2) - US2, US3

> **Run Tests**: After each sub-phase, run responsive tests to verify implementation

### 5.1 Manager Dashboard Responsive

- [ ] [T058] [P2] [US2] Update `src/screens/manager/ManagerDashboardScreen.tsx` - stack cards vertically on mobile
- [ ] [T059] [P2] [US2] Apply `ResponsiveChart` wrapper to team wellness charts
- [ ] [T060] [P2] [US2] Ensure employee list items are touch-friendly
- [ ] [T061] [P2] [US2] **RUN TESTS**: Verify manager dashboard passes responsive tests

### 5.2 Manager Individual View Responsive

- [ ] [T062] [P2] [US2] Update `src/screens/manager/ManagerIndividualScreen.tsx` - single column on mobile
- [ ] [T063] [P2] [US2] Scale individual employee charts proportionally
- [ ] [T064] [P2] [US2] **RUN TESTS**: Verify manager individual view passes responsive tests

### 5.3 HR Dashboard Responsive

- [ ] [T065] [P2] [US3] Update `src/screens/hr/HRDashboardScreen.tsx` - stack analytics cards vertically on mobile
- [ ] [T066] [P2] [US3] Apply `ResponsiveChart` to department-wide charts
- [ ] [T067] [P2] [US3] **RUN TESTS**: Verify HR dashboard passes responsive tests

### 5.4 HR Individual & SC Analysis Responsive

- [ ] [T068] [P2] [US3] Update `src/screens/hr/HRIndividualScreen.tsx` with mobile layout
- [ ] [T069] [P2] [US3] Update `src/screens/hr/SCGroupAnalysisScreen.tsx` - scale group trend charts proportionally
- [ ] [T070] [P2] [US3] **RUN TESTS**: Verify HR individual and SC analysis pass responsive tests

---

## Phase 6: iPad/Tablet Support (P2) - US5

> **Run Tests**: Run tablet-specific tests at 768px viewport after implementation

- [ ] [T071] [P2] [US5] Add `md:` breakpoint styles to all employee screens for tablet optimization
- [ ] [T072] [P2] [US5] Add `md:` breakpoint styles to manager screens - 2-column grid on tablet
- [ ] [T073] [P2] [US5] Add `md:` breakpoint styles to HR screens - optimized spacing for tablet
- [ ] [T074] [P2] [US5] Adjust physician screen for tablet viewport
- [ ] [T075] [P2] [US5] Add orientation change tests (portrait to landscape) to `cypress/e2e/responsive/tablet.cy.ts`
- [ ] [T076] [P2] [US5] **RUN TESTS**: Verify all screens pass tablet viewport tests

---

## Phase 7: Physician Mobile & Admin (P3) - US4, US7

### 7.1 Physician Screen Responsive

- [ ] [T077] [P3] [US4] Update `src/screens/physician/PhysicianScreen.tsx` - mobile-first patient list
- [ ] [T078] [P3] [US4] Ensure patient wellness data displays with clear hierarchy on mobile
- [ ] [T079] [P3] [US4] **RUN TESTS**: Verify physician screen passes responsive tests

### 7.2 Admin Console (No Changes)

- [ ] [T080] [P3] [US7] Verify `src/screens/admin/AdminConsoleScreen.tsx` has NO responsive changes
- [ ] [T081] [P3] [US7] Document admin desktop-only requirement in code comments
- [ ] [T082] [P3] [US7] **RUN TESTS**: Verify admin console is unchanged at all viewports

---

## Phase 8: Modal/Dialog Behavior (P1) - US8

> **Run Tests**: Create and run dialog-specific tests

- [ ] [T083] [P1] [US8] Create `cypress/e2e/dialogs/consent-dialog.cy.ts` - tests for centered modal and logic execution
- [ ] [T084] [P1] [US8] Update `src/features/consent/PhysicianConsentDialog.tsx` - centered modal overlay on all viewports
- [ ] [T085] [P1] [US8] Integrate `useDialogVisibility` hook into PhysicianConsentDialog, ensure logic only executes when visible
- [ ] [T086] [P1] [US8] Update `src/features/consent/SCReminderDialog.tsx` - centered modal overlay on all viewports
- [ ] [T087] [P1] [US8] Integrate `useDialogVisibility` hook into SCReminderDialog, ensure logic only executes when visible
- [ ] [T088] [P1] [US8] Add mobile-friendly padding and touch targets to dialog buttons
- [ ] [T089] [P1] [US8] **RUN TESTS**: Verify all dialogs pass visibility and responsive tests

---

## Final Phase: Polish & Documentation

- [ ] [T090] Run full Cypress test suite: `pnpm cypress run` - all tests must pass
- [ ] [T091] Run production build: `pnpm build` and verify no errors
- [ ] [T092] Update `CLAUDE.md` with new folder structure documentation
- [ ] [T093] Create PR with comprehensive description of Phase 1 and Phase 2 changes

---

## Dependencies

```
Phase 1 (T001-T008) → Phase 2 (T009-T028)
Phase 2 (T028) → Phase 3 (T029-T036) [Cypress setup after SOLID]
Phase 3 (T036) → Phase 4 (T037-T057) [Tests before employee responsive]
Phase 4 (T057) → Phase 5 (T058-T070) [Employee complete before manager/HR]
Phase 5 (T070) → Phase 6 (T071-T076) [Manager/HR before tablet optimization]
Phase 6 (T076) → Phase 7 (T077-T082) [Tablet before physician/admin]
Phase 3 (T036) → Phase 8 (T083-T089) [Tests before dialog implementation]
Phase 7-8 (T082, T089) → Final (T090-T093)
```

## Test Commands

```bash
# Run all responsive tests
pnpm cypress run --spec "cypress/e2e/responsive/**"

# Run specific viewport tests
pnpm cypress run --spec "cypress/e2e/responsive/mobile.cy.ts"
pnpm cypress run --spec "cypress/e2e/responsive/tablet.cy.ts"
pnpm cypress run --spec "cypress/e2e/responsive/desktop.cy.ts"

# Run dialog tests
pnpm cypress run --spec "cypress/e2e/dialogs/**"

# Run all tests
pnpm cypress run

# Open Cypress UI for debugging
pnpm cypress open
```

## Notes

- Phase 1 (Setup) and Phase 2 (SOLID) must complete before any responsive work
- Phase 2 verified by code review, not integration tests
- Phase 3 (Cypress) comes immediately after SOLID - tests written before responsive implementation
- Each responsive phase includes **RUN TESTS** tasks to verify TDD compliance
- Admin console (T080-T082) explicitly excluded from responsive changes
- All responsive changes use mobile-first approach: base styles = mobile, md: = tablet, lg: = desktop

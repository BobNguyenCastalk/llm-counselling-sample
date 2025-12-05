# Data Model: Mobile-First Refactor

**Date**: 2025-12-05
**Feature**: 001-mobile-first-refactor

## Overview

This feature is primarily a UI restructuring and responsive design implementation. No new data entities are introduced. This document captures the existing entities and their relationships for reference during implementation.

---

## Existing Entities

### UserRole (Enum)

Represents the type of user accessing the application.

```typescript
type UserRole = 'employee' | 'manager' | 'hr' | 'physician' | 'admin';
```

| Value | Description | Mobile Support |
|-------|-------------|----------------|
| `employee` | Primary user, wellness check-ins | ✅ Yes |
| `manager` | Team oversight, individual views | ✅ Yes |
| `hr` | Department analytics | ✅ Yes |
| `physician` | Consented patient data | ✅ Yes |
| `admin` | System configuration | ❌ Desktop only |

### Screen (Enum)

Represents navigation destinations in the application.

```typescript
type Screen =
  | 'login'
  | 'employee-home'
  | 'avatar-dialogue'
  | 'counseling'
  | 'sc-questionnaire'
  | 'conversation-history'
  | 'manager-dashboard'
  | 'manager-individual'
  | 'hr-dashboard'
  | 'hr-individual'
  | 'sc-analysis'
  | 'physician'
  | 'admin';
```

| Screen | Role | Mobile Optimized |
|--------|------|------------------|
| `login` | All | ✅ Yes |
| `employee-home` | Employee | ✅ Yes |
| `avatar-dialogue` | Employee | ✅ Yes |
| `counseling` | Employee | ✅ Yes |
| `sc-questionnaire` | Employee | ✅ Yes |
| `conversation-history` | Employee | ✅ Yes |
| `manager-dashboard` | Manager | ✅ Yes |
| `manager-individual` | Manager | ✅ Yes |
| `hr-dashboard` | HR | ✅ Yes |
| `hr-individual` | HR | ✅ Yes |
| `sc-analysis` | HR | ✅ Yes |
| `physician` | Physician | ✅ Yes |
| `admin` | Admin | ❌ Desktop only |

### Breakpoint (New Type)

Represents responsive breakpoints for the application.

```typescript
interface Breakpoint {
  name: 'mobile' | 'tablet' | 'desktop';
  minWidth: number;
  maxWidth: number | null;
  tailwindPrefix: string;
}

const BREAKPOINTS: Breakpoint[] = [
  { name: 'mobile', minWidth: 320, maxWidth: 767, tailwindPrefix: '' },
  { name: 'tablet', minWidth: 768, maxWidth: 1023, tailwindPrefix: 'md:' },
  { name: 'desktop', minWidth: 1024, maxWidth: null, tailwindPrefix: 'lg:' },
];
```

### DialogVisibility (New Type)

Represents the visibility state for modal dialogs.

```typescript
interface DialogVisibility {
  isVisible: boolean;
  shouldExecuteLogic: boolean;
}
```

**Constraint**: `shouldExecuteLogic` MUST be `false` when `isVisible` is `false`.

---

## Entity Relationships

```
┌─────────────┐
│   UserRole  │
└──────┬──────┘
       │ determines
       ▼
┌─────────────┐     ┌────────────────┐
│   Screen    │────▶│  Mobile Support │
└─────────────┘     └────────────────┘
       │
       │ renders at
       ▼
┌─────────────┐
│  Breakpoint │
└─────────────┘
```

---

## State Management

### Navigation State (App.tsx)

```typescript
interface AppState {
  currentScreen: Screen;
  userRole: UserRole | null;
  userName: string;
  selectedEmployee: string | null;
  dialogueMode: 'normal' | 'counseling';

  // SC Questionnaire
  scQuestionnaireCompleted: boolean;
  scFrequency: 'none' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  lastSCCompletionDate: Date | null;
  showSCReminderDialog: boolean;
  lastSCReminderDeclineDate: Date | null;

  // Physician Consent
  workReadiness: number;
  physicianConsentGiven: boolean;
  showConsentDialog: boolean;
  lastConsentDeclineDate: Date | null;

  // Admin Settings
  physicianConsentThreshold: number;
  consentReminderDays: number;
}
```

**Note**: State management remains in App.tsx as per constitution. The refactor reorganizes components but does not change state architecture.

---

## New Shared Types

### API Types

```typescript
// services/api/types.ts
interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: number | null;
}

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
```

### Hook Types

```typescript
// hooks/types.ts
interface UseApiReturn<T> extends ApiState<T> {
  execute: () => Promise<T | null>;
  reset: () => void;
}

interface UseDialogVisibilityReturn {
  isVisible: boolean;
  shouldExecuteLogic: boolean;
  show: () => void;
  hide: () => void;
}
```

---

## Validation Rules

### Touch Target Size
- All interactive elements MUST have minimum dimensions of 44x44 pixels on mobile
- Validation: `width >= 44 && height >= 44`

### Horizontal Scroll
- No element should cause horizontal scrolling at supported breakpoints
- Validation: `document.body.scrollWidth <= window.innerWidth`

### Dialog Logic Execution
- Dialog logic MUST only execute when dialog is visible
- Validation: `!isVisible => !shouldExecuteLogic`

---

## Migration Notes

### No Data Migration Required

This feature is a UI restructuring with no data model changes. Existing mock data in components will be preserved and relocated to:
- `cypress/fixtures/` for test data
- Component-local state for mock data (temporary, until API integration)

### File Relocations

Components will be relocated following the new folder structure, but their internal state and props interfaces remain unchanged.

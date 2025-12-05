# Research: Mobile-First Refactor

**Date**: 2025-12-05
**Feature**: 001-mobile-first-refactor

## Research Summary

This document captures research findings for implementing SOLID principles and mobile-first responsive design in the LLM Counseling App.

---

## 1. SOLID Principles in React

### Decision: Feature-based folder structure with separated concerns

### Rationale
- **Single Responsibility**: Each component should have one reason to change. Screen components handle routing/composition; feature components handle business logic; shared components handle reusable UI.
- **Open-Closed**: Components extensible via props and composition, not modification.
- **Dependency Inversion**: Components depend on abstractions (props/interfaces) not concrete implementations.
- **Interface Segregation**: Pass only required props, avoid bloated interfaces.

### Key Patterns

#### Folder Structure
```
src/
├── screens/           # Route-level (one responsibility: composition)
├── features/          # Domain logic (grouped by business domain)
├── components/shared/ # Reusable UI (stateless, prop-driven)
├── hooks/            # Custom hooks (encapsulate logic)
├── services/         # API services (RESTful request logic)
└── types/            # TypeScript interfaces
```

#### Component Design
```tsx
// SRP: Separate data from presentation
const useDashboardData = () => { /* hook handles data */ };
const Dashboard = ({ data }) => { /* component handles UI */ };

// OCP: Extend via props, not modification
const Button = ({ variant, size, children, ...props }) => (
  <button className={cn('btn', `btn-${variant}`, `btn-${size}`)} {...props}>
    {children}
  </button>
);

// DIP: Inject dependencies
const UserList = ({ users }: { users: User[] }) => (
  <div>{users.map(u => <UserCard key={u.id} user={u} />)}</div>
);
```

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Atomic Design (atoms/molecules/organisms) | More complex hierarchy, less intuitive for domain-driven app |
| Flat by type (components/hooks/utils) | Harder to maintain as app grows, poor colocation |
| Full DDD with services layer | Over-engineering for UI-only prototype |

---

## 2. Shared API Request Hook (useApi)

### Decision: Create a flexible async/await-based API hook with exported method callers

### Rationale
A centralized API hook provides:
- Consistent error handling across the application
- Loading state management
- Type-safe request/response handling
- Reusable method callers that can be invoked anywhere in code

### Implementation

#### Core API Service
```typescript
// services/api/apiClient.ts
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

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function apiRequest<T>(
  endpoint: string,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', headers = {}, body, params } = config;

  try {
    const url = new URL(endpoint, BASE_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null, status: response.status };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
      status: null,
    };
  }
}

// Exported method callers for flexible usage
export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'GET', params }),

  post: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'POST', body }),

  put: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'PUT', body }),

  patch: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'PATCH', body }),

  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};
```

#### useApi Hook with Flexible Method Caller
```typescript
// hooks/useApi.ts
import { useState, useCallback } from 'react';
import { api, apiRequest } from '@/services/api/apiClient';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: () => Promise<T | null>;
  reset: () => void;
}

// Hook for automatic fetching on mount
export function useApi<T>(
  endpoint: string,
  options?: { immediate?: boolean; params?: Record<string, string> }
): UseApiReturn<T> {
  const { immediate = true, params } = options || {};
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const response = await api.get<T>(endpoint, params);

    setState({
      data: response.data,
      isLoading: false,
      error: response.error,
    });

    return response.data;
  }, [endpoint, params]);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  // Auto-fetch on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { ...state, execute, reset };
}

// Hook for manual/deferred API calls (mutations)
export function useApiMutation<TData, TBody = unknown>() {
  const [state, setState] = useState<UseApiState<TData>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mutate = useCallback(
    async (
      endpoint: string,
      method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      body?: TBody
    ): Promise<TData | null> => {
      setState({ data: null, isLoading: true, error: null });

      const response = await apiRequest<TData>(endpoint, { method, body });

      setState({
        data: response.data,
        isLoading: false,
        error: response.error,
      });

      return response.data;
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, mutate, reset };
}

// Re-export api methods for direct use in any code block
export { api };
```

#### Usage Examples

```typescript
// Example 1: In a hook (auto-fetch)
function useEmployeeData(employeeId: string) {
  return useApi<Employee>(`/employees/${employeeId}`);
}

// Example 2: In a component (deferred/manual)
function EmployeeActions({ employeeId }: { employeeId: string }) {
  const { mutate, isLoading, error } = useApiMutation<void>();

  const handleDelete = async () => {
    await mutate(`/employees/${employeeId}`, 'DELETE');
  };

  return (
    <button onClick={handleDelete} disabled={isLoading}>
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
}

// Example 3: Direct API call in any code block (event handler, effect, etc.)
import { api } from '@/hooks/useApi';

async function handleSubmitForm(formData: FormData) {
  const result = await api.post<CreateResponse>('/submissions', formData);
  if (result.error) {
    console.error('Failed:', result.error);
    return;
  }
  console.log('Created:', result.data);
}

// Example 4: In useEffect
useEffect(() => {
  const fetchData = async () => {
    const { data, error } = await api.get<DashboardStats>('/stats');
    if (data) setStats(data);
  };
  fetchData();
}, []);

// Example 5: Multiple parallel requests
async function loadDashboard() {
  const [employees, metrics, alerts] = await Promise.all([
    api.get<Employee[]>('/employees'),
    api.get<Metrics>('/metrics'),
    api.get<Alert[]>('/alerts'),
  ]);

  return { employees: employees.data, metrics: metrics.data, alerts: alerts.data };
}
```

### Key Benefits
| Benefit | Description |
|---------|-------------|
| Flexible invocation | `api.*` methods work anywhere (hooks, components, event handlers) |
| Async/await native | No callback patterns, clean async code |
| Type-safe | Full TypeScript generics for request/response |
| Centralized error handling | Consistent error format across all requests |
| State management | Optional loading/error states via hooks |

---

## 3. Mobile-First Responsive with Tailwind CSS

### Decision: Use Tailwind's mobile-first breakpoint system with custom breakpoints

### Rationale
Tailwind's mobile-first approach matches our requirement: unprefixed utilities apply to all screen sizes, breakpoint prefixes apply at that size and above.

### Breakpoint Strategy

| Category | Width Range | Tailwind Prefix | Usage |
|----------|-------------|-----------------|-------|
| Mobile | 320-767px | (none) | Base styles |
| Tablet | 768-1023px | `md:` | Tablet adjustments |
| Desktop | 1024px+ | `lg:`, `xl:` | Desktop layouts |

### Key Patterns

#### Layout
```tsx
// Stack on mobile, row on tablet+
<div className="flex flex-col md:flex-row">

// Single column mobile, multi-column desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Full width mobile, constrained desktop
<div className="w-full lg:max-w-4xl lg:mx-auto">
```

#### Touch Targets (WCAG AAA: 44x44px minimum)
```tsx
<button className="min-h-11 min-w-11 px-4 py-2">
<a className="block py-3 px-4">  // Navigation links
```

#### Chart Scaling
```tsx
// Charts scale proportionally with fixed min-height
<div className="w-full h-64 md:h-80 lg:h-96">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} />
  </ResponsiveContainer>
</div>
```

#### Device Rotation
```tsx
// Tailwind orientation modifiers
<div className="portrait:flex-col landscape:flex-row">

// Or use useBreakpoint hook for JS logic
const isLandscape = useBreakpoint("(orientation: landscape)");
```

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Desktop-first (override down) | Against Tailwind philosophy, more CSS code |
| CSS Modules | Less integrated with Tailwind utilities |
| Styled Components | Adds runtime overhead, different paradigm |

---

## 4. Cypress Integration Testing

### Decision: Viewport-based test suites with hardcoded fixture data

### Rationale
Cypress viewport commands allow testing responsive behavior at multiple breakpoints. Fixtures enable consistent, reproducible test data.

### Test Organization
```
cypress/
├── e2e/
│   ├── employee/           # Per-role tests
│   ├── manager/
│   ├── hr/
│   ├── physician/
│   └── responsive/         # Cross-cutting responsive tests
│       ├── mobile.cy.ts
│       ├── tablet.cy.ts
│       └── desktop.cy.ts
├── fixtures/
│   ├── users.json
│   ├── viewports.json
│   └── test-data.json
└── support/
    └── commands.ts
```

### Key Patterns

#### Viewport Testing
```javascript
// Predefined devices
cy.viewport('iphone-6')        // 375x667
cy.viewport('ipad-2')          // 768x1024
cy.viewport('macbook-15')      // 1440x900

// Orientation
cy.viewport('iphone-6', 'landscape')
```

#### No Horizontal Scroll Assertion
```javascript
cy.visit('/page')
cy.scrollTo('right')
cy.window().its('scrollX').should('equal', 0)
```

#### Touch Target Validation
```javascript
cy.get('[data-testid="button"]').then(($el) => {
  const rect = $el[0].getBoundingClientRect()
  expect(rect.width).to.be.at.least(44)
  expect(rect.height).to.be.at.least(44)
})
```

#### Fixture Data
```javascript
// cypress/fixtures/viewports.json
{
  "mobile": { "width": 375, "height": 667 },
  "tablet": { "width": 768, "height": 1024 },
  "desktop": { "width": 1280, "height": 800 }
}

// In test
cy.fixture('viewports').then((vp) => {
  cy.viewport(vp.mobile.width, vp.mobile.height)
})
```

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Playwright | Team already familiar with Cypress |
| Real device testing only | Slower CI, harder to automate |
| Visual regression tools (Percy) | Additional cost, not required for MVP |

---

## 5. useBreakpoint Hook Design

### Decision: Custom hook using matchMedia for responsive logic

### Rationale
Some responsive behavior requires JavaScript (conditional rendering, chart simplification). A reusable hook centralizes this logic.

### Implementation
```typescript
// hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

export function useBreakpoint(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Convenience hooks
export const useIsMobile = () => useBreakpoint('(max-width: 767px)');
export const useIsTablet = () => useBreakpoint('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useBreakpoint('(min-width: 1024px)');
```

### Usage
```tsx
function Dashboard() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileChart /> : <DesktopChart />;
}
```

---

## 6. useDialogVisibility Hook Design

### Decision: Custom hook to manage dialog visibility state and deferred logic execution

### Rationale
Dialogs should only execute their internal logic when visible (per FR-011). A hook encapsulates this pattern.

### Implementation
```typescript
// hooks/useDialogVisibility.ts
import { useState, useCallback, useEffect } from 'react';

interface UseDialogVisibilityOptions {
  onShow?: () => void;
  onHide?: () => void;
}

export function useDialogVisibility(options: UseDialogVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldExecuteLogic, setShouldExecuteLogic] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
    setShouldExecuteLogic(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShouldExecuteLogic(true);
      options.onShow?.();
    } else {
      options.onHide?.();
    }
  }, [isVisible, options]);

  return { isVisible, shouldExecuteLogic, show, hide };
}
```

---

## Research Sources

### SOLID Principles in React
- [Mastering SOLID Principles in React - DEV Community](https://dev.to/drruvari/mastering-solid-principles-in-react-easy-examples-and-best-practices-142b)
- [Applying SOLID To React - Medium](https://medium.com/byborg-engineering/applying-solid-to-react-ca6d1ff926a4)
- [React Folder Structure in 5 Steps [2025]](https://www.robinwieruch.de/react-folder-structure/)

### Tailwind CSS Responsive Design
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [20 Tips for Designing Mobile-First with Tailwind CSS](https://dev.to/hitesh_developer/20-tips-for-designing-mobile-first-with-tailwind-css-36km)
- [WCAG 2.1 Target Size (AAA)](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

### Cypress Testing
- [Cypress Viewport Documentation](https://docs.cypress.io/api/commands/viewport)
- [Mastering Cypress Viewport | LambdaTest](https://www.lambdatest.com/blog/cypress-viewport/)
- [Organizing Test Data with Cypress Fixtures](https://devealbert.hashnode.dev/how-to-organize-and-separate-test-data-using-fixture-in-cypress)

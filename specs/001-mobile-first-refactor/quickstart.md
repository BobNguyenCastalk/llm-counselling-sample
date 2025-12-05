# Quickstart: Mobile-First Refactor

**Date**: 2025-12-05
**Feature**: 001-mobile-first-refactor

## Prerequisites

- Node.js 18+
- pnpm (package manager)
- Git

## Setup

```bash
# Clone and checkout feature branch
git checkout 001-mobile-first-refactor

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will open at `http://localhost:3000`.

---

## Testing Responsive Layouts

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test at these viewport widths:
   - **Mobile**: 375px (iPhone)
   - **Tablet**: 768px (iPad portrait)
   - **Desktop**: 1280px

### Cypress Tests

```bash
# Install Cypress (first time)
pnpm add -D cypress

# Open Cypress UI
pnpm cypress open

# Run all tests headlessly
pnpm cypress run

# Run responsive tests only
pnpm cypress run --spec "cypress/e2e/responsive/**"
```

---

## Test User Accounts

Login with these email patterns to access different roles:

| Role | Email Pattern | Example |
|------|---------------|---------|
| Employee | Any email not matching others | `john@company.com` |
| Manager | Contains "manager" | `manager@company.com` |
| HR | Contains "hr" | `hr@company.com` |
| Physician | Contains "doctor" or "physician" | `doctor@company.com` |
| Admin | Contains "admin" | `admin@company.com` |

Password: Any value (mock authentication)

---

## Folder Structure After Refactor

```
src/
├── screens/                    # Route-level components
│   ├── LoginScreen.tsx
│   ├── employee/
│   ├── manager/
│   ├── hr/
│   ├── physician/
│   └── admin/
├── features/                   # Domain-specific components
│   ├── auth/
│   ├── employee/
│   ├── dialogue/
│   ├── manager/
│   ├── hr/
│   ├── physician/
│   └── consent/
├── components/
│   ├── shared/                 # Shared reusable UI
│   │   ├── layout/
│   │   ├── feedback/
│   │   └── charts/
│   ├── ui/                     # Radix primitives
│   └── figma/                  # Figma-generated
├── hooks/
│   ├── useApi.ts              # API request hook
│   ├── useBreakpoint.ts       # Responsive breakpoint hook
│   └── useDialogVisibility.ts # Dialog visibility hook
├── services/
│   └── api/
│       └── apiClient.ts       # REST API client
├── types/
│   └── index.ts
└── i18n/
```

---

## Key Development Patterns

### Mobile-First Tailwind Classes

```tsx
// Base styles apply to mobile, md: for tablet, lg: for desktop
<div className="flex flex-col md:flex-row lg:gap-8">
  <aside className="w-full md:w-1/3 lg:w-1/4">
  <main className="w-full md:w-2/3 lg:w-3/4">
</div>
```

### Touch Target Sizing

```tsx
// Minimum 44x44px for interactive elements
<button className="min-h-11 min-w-11 px-4 py-2">
  Click me
</button>
```

### Using the API Hook

```tsx
import { useApi, api } from '@/hooks/useApi';

// Auto-fetch on mount
function UserProfile({ userId }) {
  const { data, isLoading, error } = useApi<User>(`/users/${userId}`);

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <Profile user={data} />;
}

// Manual/deferred calls
async function handleSubmit(formData) {
  const result = await api.post<Response>('/submit', formData);
  if (result.error) {
    console.error(result.error);
  }
}
```

### Using the Breakpoint Hook

```tsx
import { useIsMobile, useIsDesktop } from '@/hooks/useBreakpoint';

function Dashboard() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileView /> : <DesktopView />;
}
```

### Using the Dialog Visibility Hook

```tsx
import { useDialogVisibility } from '@/hooks/useDialogVisibility';

function ConsentFlow() {
  const dialog = useDialogVisibility({
    onShow: () => console.log('Dialog shown'),
  });

  // Logic only runs when shouldExecuteLogic is true
  useEffect(() => {
    if (dialog.shouldExecuteLogic) {
      // Fetch consent status, etc.
    }
  }, [dialog.shouldExecuteLogic]);

  return (
    <>
      <button onClick={dialog.show}>Show Consent</button>
      {dialog.isVisible && (
        <ConsentDialog onClose={dialog.hide} />
      )}
    </>
  );
}
```

---

## Verification Checklist

### Phase 1: SOLID Restructure (Code Review)

- [ ] Each component has single responsibility
- [ ] Components use props for extension (not modification)
- [ ] Shared components in `components/shared/`
- [ ] Hooks extracted for data fetching logic
- [ ] No circular imports between folders

### Phase 2: Responsive (Cypress Tests)

```bash
# Run all responsive tests
pnpm cypress run --spec "cypress/e2e/responsive/**"
```

- [ ] No horizontal scroll at 375px width
- [ ] No horizontal scroll at 768px width
- [ ] Touch targets >= 44px on mobile
- [ ] Charts scale proportionally
- [ ] Desktop layouts preserved at 1280px
- [ ] Admin console unchanged

---

## Common Issues

### Issue: Component not found after refactor

**Solution**: Update import paths to use `@/` alias:
```tsx
// Before
import { Button } from '../../../components/ui/button';

// After
import { Button } from '@/components/ui/button';
```

### Issue: Horizontal scroll on mobile

**Solution**: Check for fixed widths or `w-screen`:
```tsx
// Bad
<div className="w-screen px-4">

// Good
<div className="w-full max-w-full px-4">
```

### Issue: Dialog logic running when hidden

**Solution**: Use `shouldExecuteLogic` from hook:
```tsx
const { isVisible, shouldExecuteLogic } = useDialogVisibility();

useEffect(() => {
  if (!shouldExecuteLogic) return;
  // Safe to run logic here
}, [shouldExecuteLogic]);
```

---

## Build & Deploy

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

Build output is in `./build` directory.

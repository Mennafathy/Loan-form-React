# React Project Architecture & Development Guide

## 1. Purpose

This document defines the standard architecture, folder structure, naming conventions, development commands, and code-generation rules for this React project.

The goal is to make the codebase:

- Consistent across developers
- Easy to maintain and scale
- Easy for new developers to understand
- Friendly to automated code-generation tools and AI coding agents
- Testable and production-ready
- Feature-oriented rather than file-type-oriented

---

# 2. Recommended Technology Stack

The project should use:

- React
- TypeScript
- Vite
- React Router
- SCSS
- ESLint
- Prettier
- Vitest + React Testing Library
- Plop.js for code generation

Recommended supporting libraries can be added according to project requirements.

---

# 3. Project Structure

Recommended high-level structure:

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes/
│   │   ├── index.tsx
│   │   └── routeConfig.tsx
│   ├── providers/
│   │   └── AppProviders.tsx
│   └── layouts/
│       ├── MainLayout/
│       └── AuthLayout/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── Spinner/
│   └── common/
│       ├── Header/
│       ├── Footer/
│       └── ErrorBoundary/
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── auth.routes.tsx
│   │   └── index.ts
│   │
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── models/
│   │   ├── pages/
│   │   └── index.ts
│   │
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── models/
│       ├── pages/
│       └── index.ts
│
├── hooks/
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── index.ts
│
├── services/
│   ├── api/
│   │   ├── apiClient.ts
│   │   └── apiError.ts
│   └── storage/
│       └── storageService.ts
│
├── config/
│   ├── environment.ts
│   └── constants.ts
│
├── types/
│   ├── api.ts
│   └── common.ts
│
├── utils/
│   ├── date.ts
│   ├── format.ts
│   └── validation.ts
│
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _functions.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   └── main.scss
│
├── main.tsx
└── vite-env.d.ts
```

---

# 4. Architecture Principles

## 4.1 Feature-first architecture

Business functionality should live inside `features`.

Example:

```text
features/
└── users/
    ├── components/
    ├── hooks/
    ├── models/
    ├── pages/
    ├── services/
    └── index.ts
```

Do not create a large global folder such as:

```text
components/
├── UserCard.tsx
├── UserTable.tsx
├── UserForm.tsx
├── ProductCard.tsx
├── ProductTable.tsx
└── ...
```

Instead, feature-specific components should remain close to their feature:

```text
features/
└── users/
    └── components/
        ├── UserCard/
        ├── UserTable/
        └── UserForm/
```

---

# 5. Shared Components

Only genuinely reusable components should go into:

```text
src/components/
```

Use:

```text
components/ui/
```

for generic UI components:

```text
Button
Input
Select
Modal
Table
Spinner
Badge
Card
```

Use:

```text
components/common/
```

for application-wide components:

```text
Header
Footer
ErrorBoundary
LoadingScreen
```

A component should not be placed in `components/ui` simply because it might be reused someday.

Promote components to shared only when there is a real reuse requirement.

---

# 6. Component Structure

Recommended component structure:

```text
Button/
├── Button.tsx
├── Button.module.scss
├── Button.test.tsx
└── index.ts
```

Example:

```tsx
import styles from './Button.module.scss';

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

`index.ts`:

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

---

# 7. Pages

Pages should represent route-level screens.

Example:

```text
features/
└── users/
    └── pages/
        ├── UsersPage/
        │   ├── UsersPage.tsx
        │   ├── UsersPage.module.scss
        │   ├── UsersPage.test.tsx
        │   └── index.ts
        │
        └── UserDetailsPage/
            ├── UserDetailsPage.tsx
            ├── UserDetailsPage.module.scss
            ├── UserDetailsPage.test.tsx
            └── index.ts
```

Pages should orchestrate components and application behavior.

Avoid putting large reusable UI implementations directly inside pages.

---

# 8. Hooks

Global reusable hooks belong in:

```text
src/hooks/
```

Example:

```text
hooks/
├── useDebounce.ts
├── useLocalStorage.ts
└── index.ts
```

Feature-specific hooks belong inside the feature:

```text
features/
└── users/
    └── hooks/
        ├── useUsers.ts
        └── useUserDetails.ts
```

Rule:

> If the hook contains business logic specific to a feature, keep it inside that feature.

---

# 9. Services

API and external integration logic should not be implemented directly inside components.

Bad:

```tsx
function UsersPage() {
  const loadUsers = async () => {
    const response = await fetch('/api/users');
  };
}
```

Prefer:

```text
features/
└── users/
    └── services/
        └── userService.ts
```

Example:

```ts
import { apiClient } from '@/services/api/apiClient';

export const userService = {
  getUsers() {
    return apiClient.get('/users');
  },

  getUser(id: string) {
    return apiClient.get(`/users/${id}`);
  },
};
```

Components should consume services through hooks or feature-level abstractions where appropriate.

---

# 10. Models and Types

Feature-specific types belong inside the feature:

```text
features/
└── users/
    └── models/
        ├── user.ts
        └── userResponse.ts
```

Shared types belong in:

```text
src/types/
```

Avoid creating a giant:

```text
types.ts
```

file containing unrelated domain models.

---

# 11. SCSS Convention

Use CSS Modules:

```text
Button.module.scss
```

Example:

```scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

Component:

```tsx
import styles from './Button.module.scss';

<button className={styles.button}>
  Save
</button>
```

Avoid global component styles unless they are truly global.

Global SCSS should be limited to:

```text
styles/
├── abstracts/
├── base/
└── main.scss
```

---

# 12. Naming Conventions

## Components

Use PascalCase:

```text
UserCard
UserTable
UserForm
```

Files:

```text
UserCard.tsx
UserCard.module.scss
UserCard.test.tsx
```

## Hooks

Use `use` + PascalCase:

```text
useAuth
useUsers
useDebounce
```

Files:

```text
useAuth.ts
useUsers.ts
```

## Services

Use camelCase:

```text
userService.ts
authService.ts
```

## Models

Use camelCase:

```text
user.ts
userResponse.ts
```

## Constants

Use:

```text
constants.ts
```

and:

```ts
export const MAX_PAGE_SIZE = 100;
```

---

# 13. Import Aliases

Use the `@` alias for `src`.

Prefer:

```ts
import { Button } from '@/components/ui/Button';
```

instead of:

```ts
import { Button } from '../../../components/ui/Button';
```

Configure the alias in Vite and TypeScript.

---

# 14. Code Generation

The project uses **Plop.js** to generate files consistently.

Install:

```bash
npm install -D plop
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "generate": "plop",
    "generate:component": "plop component",
    "generate:page": "plop page",
    "generate:hook": "plop hook",
    "generate:service": "plop service",
    "generate:model": "plop model"
  }
}
```

---

# 15. Generator Commands

## Create a component

```bash
npm run generate:component Button
```

Expected output:

```text
src/components/ui/Button/
├── Button.tsx
├── Button.module.scss
├── Button.test.tsx
└── index.ts
```

For a feature component:

```bash
npm run generate:component UserCard -- --feature users
```

Expected:

```text
src/features/users/components/UserCard/
├── UserCard.tsx
├── UserCard.module.scss
├── UserCard.test.tsx
└── index.ts
```

---

# 16. Create a Page

```bash
npm run generate:page Users
```

Expected:

```text
src/features/users/pages/UsersPage/
├── UsersPage.tsx
├── UsersPage.module.scss
├── UsersPage.test.tsx
└── index.ts
```

---

# 17. Create a Hook

```bash
npm run generate:hook useUsers
```

Expected:

```text
src/hooks/
└── useUsers.ts
```

Feature-specific:

```bash
npm run generate:hook useUserDetails -- --feature users
```

Expected:

```text
src/features/users/hooks/
└── useUserDetails.ts
```

---

# 18. Create a Service

```bash
npm run generate:service userService
```

Expected:

```text
src/services/
└── userService.ts
```

Feature-specific:

```bash
npm run generate:service userService -- --feature users
```

Expected:

```text
src/features/users/services/
└── userService.ts
```

---

# 19. Create a Model

```bash
npm run generate:model User
```

Expected:

```text
src/types/
└── user.ts
```

Feature-specific:

```bash
npm run generate:model User -- --feature users
```

Expected:

```text
src/features/users/models/
└── user.ts
```

---

# 20. Recommended Generator Set

The project should eventually support:

```bash
npm run generate:component <Name>
npm run generate:page <Name>
npm run generate:hook <Name>
npm run generate:service <Name>
npm run generate:model <Name>
npm run generate:context <Name>
npm run generate:store <Name>
npm run generate:feature <Name>
```

The `feature` generator is particularly useful because it can create the complete feature structure:

```text
features/
└── reports/
    ├── components/
    ├── hooks/
    ├── models/
    ├── pages/
    ├── services/
    ├── reports.routes.tsx
    └── index.ts
```

Command:

```bash
npm run generate:feature reports
```

---

# 21. Plop Directory

Keep generator configuration outside `src`:

```text
plop/
├── generators/
│   ├── component.js
│   ├── page.js
│   ├── hook.js
│   ├── service.js
│   ├── model.js
│   └── feature.js
│
└── templates/
    ├── component/
    ├── page/
    ├── hook/
    ├── service/
    └── model/
```

Example:

```text
plop/
├── generators/
│   └── component.js
│
└── templates/
    └── component/
        ├── Component.tsx.hbs
        ├── Component.module.scss.hbs
        ├── Component.test.tsx.hbs
        └── index.ts.hbs
```

---

# 22. Example Plop Generator

Example:

```js
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a React component',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
      {
        type: 'input',
        name: 'feature',
        message: 'Feature name (leave empty for shared component):',
      },
    ],

    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop/templates/component/Component.tsx.hbs',
      },
    ],
  });
};
```

The actual project generator should use conditional paths so feature components are generated under the selected feature.

---

# 23. Testing

Every reusable component should have a test file:

```text
Button/
├── Button.tsx
├── Button.module.scss
├── Button.test.tsx
└── index.ts
```

Use:

- Vitest
- React Testing Library

Tests should focus on behavior rather than implementation details.

Example:

```tsx
describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Save</Button>);

    expect(
      screen.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument();
  });
});
```

---

# 24. Routing

Application-level routing belongs under:

```text
src/app/routes/
```

Feature-specific routes should remain with the feature:

```text
features/
└── users/
    └── users.routes.tsx
```

Example:

```tsx
export const userRoutes = [
  {
    path: '/users',
    element: <UsersPage />,
  },
];
```

The application route configuration composes feature routes.

---

# 25. Dependency Rules

Use the following dependency direction:

```text
app
 ↓
features
 ↓
shared components / services / utilities
```

Avoid:

```text
shared → feature
```

For example, `components/ui/Button` must not import:

```text
features/users/...
```

Shared components must remain domain-independent.

---

# 26. Business Logic Rules

Do not place significant business logic directly inside JSX.

Avoid:

```tsx
return (
  <button>
    {user.role === 'admin' &&
    user.status === 'active' &&
    permissions.includes('EDIT')
      ? 'Edit'
      : 'View'}
  </button>
);
```

Prefer extracting business decisions into hooks, services, selectors, or utility functions.

The UI should primarily be responsible for presentation and user interaction.

---

# 27. API Rules

Components should not directly manage raw HTTP requests.

Avoid:

```tsx
fetch('/api/users')
```

inside components.

Prefer:

```text
Component
    ↓
Hook
    ↓
Service
    ↓
API Client
    ↓
Backend
```

Example:

```text
UsersPage
    ↓
useUsers()
    ↓
userService.getUsers()
    ↓
apiClient.get()
    ↓
Backend API
```

---

# 28. Environment Variables

Environment-specific configuration should be handled through Vite environment variables.

Example:

```text
.env
.env.development
.env.test
.env.production
```

Only variables intended for frontend exposure should use:

```text
VITE_
```

Example:

```env
VITE_API_BASE_URL=https://example.com/api
```

Never place secrets in frontend environment variables.

Anything shipped to the browser must be considered public.

---

# 29. Barrel Exports

Use `index.ts` files for clean public APIs.

Example:

```text
Button/
├── Button.tsx
└── index.ts
```

`index.ts`:

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

Then:

```ts
import { Button } from '@/components/ui/Button';
```

instead of:

```ts
import { Button } from '@/components/ui/Button/Button';
```

Do not create unnecessary global barrel files that export the entire application.

---

# 30. Developer Workflow

Recommended workflow:

### Step 1 — Create feature

```bash
npm run generate:feature users
```

### Step 2 — Generate page

```bash
npm run generate:page Users -- --feature users
```

### Step 3 — Generate components

```bash
npm run generate:component UserTable -- --feature users
npm run generate:component UserFilters -- --feature users
```

### Step 4 — Generate hooks

```bash
npm run generate:hook useUsers -- --feature users
```

### Step 5 — Generate service

```bash
npm run generate:service userService -- --feature users
```

### Step 6 — Implement

Implement business behavior and UI.

### Step 7 — Test

```bash
npm run test
```

### Step 8 — Lint

```bash
npm run lint
```

### Step 9 — Build

```bash
npm run build
```

---

# 31. Standard npm Commands

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

Format:

```bash
npm run format
```

Test:

```bash
npm run test
```

Test UI/watch mode:

```bash
npm run test:watch
```

Generate:

```bash
npm run generate
```

---

# 32. AI Coding Agent Rules

AI coding agents must follow these rules when modifying this project.

## Rule 1 — Do not invent architecture

Follow the existing project structure.

## Rule 2 — Use generators

When creating a new component, page, hook, service, or feature, prefer the project's generator commands/templates.

Do not manually create files if an existing generator supports the requested artifact.

## Rule 3 — Respect feature boundaries

Feature-specific code belongs inside its feature.

## Rule 4 — Do not move code unnecessarily

Do not reorganize existing folders unless there is a documented architectural reason.

## Rule 5 — Do not duplicate shared functionality

Before creating a new utility or component, check whether an existing one can be reused.

## Rule 6 — Preserve existing conventions

Follow the existing:

- Naming
- SCSS
- Testing
- Routing
- API
- State-management
- Import
- Export

conventions.

## Rule 7 — Do not put business logic in presentation components

Keep business logic in appropriate hooks/services/domain-level functions.

## Rule 8 — Do not expose secrets

Never add API keys, passwords, client secrets, or credentials to frontend code or `.env` variables exposed through Vite.

---

# 33. Definition of Done for a New Component

A component is considered complete when applicable:

- [ ] Component created using the generator
- [ ] TypeScript types are defined
- [ ] SCSS uses CSS Modules
- [ ] No unnecessary global styles
- [ ] Accessibility considered
- [ ] Unit/behavior tests added
- [ ] `index.ts` export added
- [ ] No business logic unnecessarily embedded in JSX
- [ ] No API calls directly from the component
- [ ] ESLint passes
- [ ] Tests pass
- [ ] Build passes

---

# 34. Definition of Done for a New Feature

A feature should generally contain:

```text
features/
└── feature-name/
    ├── components/
    ├── hooks/
    ├── models/
    ├── pages/
    ├── services/
    ├── feature-name.routes.tsx
    └── index.ts
```

Checklist:

- [ ] Feature generated using the generator
- [ ] Routes defined
- [ ] Pages created
- [ ] API integration isolated
- [ ] Models/types defined
- [ ] Components separated appropriately
- [ ] Tests added
- [ ] No unnecessary cross-feature dependencies
- [ ] Public exports defined
- [ ] Lint passes
- [ ] Tests pass
- [ ] Production build passes

---

# 35. Golden Rule

The project should make the correct architecture the easiest architecture to use.

Developers should not have to decide manually where every new file belongs.

Use generators:

```bash
npm run generate:component
npm run generate:page
npm run generate:hook
npm run generate:service
npm run generate:model
npm run generate:feature
```

The generator templates are the single source of truth for the standard structure of newly created code.

---

# 36. Target Developer Experience

The final developer experience should feel similar to Angular CLI:

```bash
npm run generate:feature users

npm run generate:page Users -- --feature users

npm run generate:component UserTable -- --feature users

npm run generate:hook useUsers -- --feature users

npm run generate:service userService -- --feature users

npm run generate:model User -- --feature users
```

This ensures the project remains consistent as the team and codebase grow.

export default {
  description: 'Create a complete feature folder structure with routes, pages, hooks, models, and services',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Feature name (e.g. reports, loans, users):',
      validate: (value) => (value ? true : 'Feature name is required'),
    },
  ],
  actions: [
    // Feature barrel index
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/index.ts',
      templateFile: 'plop/templates/feature/index.ts.hbs',
    },
    // Feature routes
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/{{camelCase name}}.routes.tsx',
      templateFile: 'plop/templates/feature/routes.tsx.hbs',
    },
    // Feature service
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/services/{{camelCase name}}Service.ts',
      templateFile: 'plop/templates/service/service.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/services/{{camelCase name}}Service.test.ts',
      templateFile: 'plop/templates/service/service.test.ts.hbs',
    },
    // Feature model
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/models/{{camelCase name}}.ts',
      templateFile: 'plop/templates/model/model.ts.hbs',
    },
    // Feature hook
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/hooks/use{{pascalCase name}}.ts',
      templateFile: 'plop/templates/hook/hook.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/hooks/use{{pascalCase name}}.test.ts',
      templateFile: 'plop/templates/hook/hook.test.ts.hbs',
    },
    // Feature main page
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.tsx',
      templateFile: 'plop/templates/page/Page.tsx.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.module.scss',
      templateFile: 'plop/templates/page/Page.module.scss.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.test.tsx',
      templateFile: 'plop/templates/page/Page.test.tsx.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{camelCase name}}/pages/{{pascalCase name}}Page/index.ts',
      templateFile: 'plop/templates/page/index.ts.hbs',
    },
  ],
};

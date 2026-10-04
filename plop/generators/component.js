export default {
  description: 'Create a React component (shared UI or feature component)',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Component name (e.g. Button, UserCard):',
      validate: (value) => (value ? true : 'Component name is required'),
    },
    {
      type: 'input',
      name: 'feature',
      message: 'Feature name (leave empty for shared UI component):',
      default: '',
    },
  ],
  actions: (data) => {
    const isFeature = Boolean(data.feature && data.feature.trim());
    const baseDir = isFeature
      ? `src/features/{{camelCase feature}}/components/{{pascalCase name}}`
      : `src/components/ui/{{pascalCase name}}`;

    return [
      {
        type: 'add',
        path: `${baseDir}/{{pascalCase name}}.tsx`,
        templateFile: 'plop/templates/component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: `${baseDir}/{{pascalCase name}}.module.scss`,
        templateFile: 'plop/templates/component/Component.module.scss.hbs',
      },
      {
        type: 'add',
        path: `${baseDir}/{{pascalCase name}}.test.tsx`,
        templateFile: 'plop/templates/component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: `${baseDir}/index.ts`,
        templateFile: 'plop/templates/component/index.ts.hbs',
      },
    ];
  },
};

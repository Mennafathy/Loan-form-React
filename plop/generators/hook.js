export default {
  description: 'Create a custom React hook',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Hook name (e.g. useUsers, useDebounce):',
      validate: (value) => (value ? true : 'Hook name is required'),
      filter: (value) => (value.startsWith('use') ? value : `use${value.charAt(0).toUpperCase()}${value.slice(1)}`),
    },
    {
      type: 'input',
      name: 'feature',
      message: 'Feature name (leave empty for global hook):',
      default: '',
    },
  ],
  actions: (data) => {
    const isFeature = Boolean(data.feature && data.feature.trim());
    const targetDir = isFeature
      ? `src/features/{{camelCase feature}}/hooks`
      : `src/hooks`;

    return [
      {
        type: 'add',
        path: `${targetDir}/{{camelCase name}}.ts`,
        templateFile: 'plop/templates/hook/hook.ts.hbs',
      },
      {
        type: 'add',
        path: `${targetDir}/{{camelCase name}}.test.ts`,
        templateFile: 'plop/templates/hook/hook.test.ts.hbs',
      },
    ];
  },
};

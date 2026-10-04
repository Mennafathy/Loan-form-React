export default {
  description: 'Create a route-level Page component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Page name (e.g. Users, Dashboard):',
      validate: (value) => (value ? true : 'Page name is required'),
      filter: (value) => value.replace(/Page$/i, ''),
    },
    {
      type: 'input',
      name: 'feature',
      message: 'Feature name (e.g. users, loans, auth):',
      default: '',
    },
  ],
  actions: (data) => {
    const isFeature = Boolean(data.feature && data.feature.trim());
    const baseDir = isFeature
      ? `src/features/{{camelCase feature}}/pages/{{pascalCase name}}Page`
      : `src/pages/{{pascalCase name}}Page`;

    return [
      {
        type: 'add',
        path: `${baseDir}/{{pascalCase name}}Page.tsx`,
        templateFile: 'plop/templates/page/Page.tsx.hbs',
      },
      {
        type: 'add',
        path: `${baseDir}/{{pascalCase name}}Page.module.scss`,
        templateFile: 'plop/templates/page/Page.module.scss.hbs',
      },
      {
        type: 'add',
        path: `${baseDir}/{{pascalCase name}}Page.test.tsx`,
        templateFile: 'plop/templates/page/Page.test.tsx.hbs',
      },
      {
        type: 'add',
        path: `${baseDir}/index.ts`,
        templateFile: 'plop/templates/page/index.ts.hbs',
      },
    ];
  },
};

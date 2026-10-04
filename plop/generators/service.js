export default {
  description: 'Create an API/data service',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Service name (e.g. userService):',
      validate: (value) => (value ? true : 'Service name is required'),
    },
    {
      type: 'input',
      name: 'feature',
      message: 'Feature name (leave empty for global service):',
      default: '',
    },
  ],
  actions: (data) => {
    const isFeature = Boolean(data.feature && data.feature.trim());
    const targetDir = isFeature
      ? `src/features/{{camelCase feature}}/services`
      : `src/services`;

    return [
      {
        type: 'add',
        path: `${targetDir}/{{camelCase name}}.ts`,
        templateFile: 'plop/templates/service/service.ts.hbs',
      },
      {
        type: 'add',
        path: `${targetDir}/{{camelCase name}}.test.ts`,
        templateFile: 'plop/templates/service/service.test.ts.hbs',
      },
    ];
  },
};

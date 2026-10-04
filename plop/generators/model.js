export default {
  description: 'Create a TypeScript model/type definition',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Model name (e.g. User, LoanApplication):',
      validate: (value) => (value ? true : 'Model name is required'),
    },
    {
      type: 'input',
      name: 'feature',
      message: 'Feature name (leave empty for shared src/types):',
      default: '',
    },
  ],
  actions: (data) => {
    const isFeature = Boolean(data.feature && data.feature.trim());
    const targetPath = isFeature
      ? `src/features/{{camelCase feature}}/models/{{camelCase name}}.ts`
      : `src/types/{{camelCase name}}.ts`;

    return [
      {
        type: 'add',
        path: targetPath,
        templateFile: 'plop/templates/model/model.ts.hbs',
      },
    ];
  },
};

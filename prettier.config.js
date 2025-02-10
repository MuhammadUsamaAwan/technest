/** @type { import('prettier').Config & import('@ianvs/prettier-plugin-sort-imports').PluginConfig } */
const config = {
  useTabs: false,
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  endOfLine: 'auto',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(react-dom/(.*)$)|^(react-dom$)',
    '',
    '^(@tanstack/(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/types/(.*)$',
    '^~/config/(.*)$',
    '^~/db/(.*)$',
    '^~/lib/(.*)$',
    '^~/components/(.*)$',
    '^~/routes/(.*)$',
    '',
    '^[./]',
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};

export default config;

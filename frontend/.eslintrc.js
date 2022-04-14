module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'airbnb-typescript',
    'airbnb-typescript/base'
  ],
  "settings": {
    "import/extensions": [
      ".js",
      ".jsx"
    ]
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    '@typescript-eslint',
    "prettier"
  ],
  rules: {
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
      "prettier/prettier": ["error",   {
        'endOfLine': 'auto',
      }],
    "indent": 'off',
    "import/prefer-default-export": "off",
    "no-underscore-dangle":  'off',
    'object-curly-newline': 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  },
};

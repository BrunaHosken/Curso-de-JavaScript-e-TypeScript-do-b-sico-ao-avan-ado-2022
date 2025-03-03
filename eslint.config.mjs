import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,cjs}"],
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "webpack.config.js",
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "no-undef": "off",

      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          caughtErrors: "none",
        },
      ],
      "no-unreachable": "error",
      "no-empty": "error",

      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],

      indent: ["error", 2],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "comma-spacing": ["error", { before: false, after: true }],
      "space-before-blocks": ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": "error",
      "brace-style": ["error", "1tbs"],
      camelcase: "off",
      "max-len": ["error", { code: 100 }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
    },
  },

  {
    files: ["**/*.ts"],
    ...tseslint.configs.recommended,
  },

  {
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ["@babel/preset-react"],
      },
    },
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
];

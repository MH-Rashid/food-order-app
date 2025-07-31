import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules/**", "eslint.config.mjs"],
    plugins: {
      js,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: globals.node,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.json'],
          moduleDirectory: ['node_modules', './'],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      indent: ["error", 2],
      "no-unused-vars": ["warn"],
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": "error",
      "no-console": "off",
    },
  },
]);

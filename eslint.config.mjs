import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Project additions on top of Next's rules. All passed when added.
    rules: {
      "react/no-array-index-key": "error",
      "react/jsx-key": [
        "error",
        { checkFragmentShorthand: true, warnOnDuplicates: true },
      ],
      "no-console": ["error", { allow: ["error", "warn"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  },
  {
    // Tests may assert that a lookup succeeded.
    files: ["tests/**"],
    rules: { "@typescript-eslint/no-non-null-assertion": "off" },
  },
  {
    // Command-line scripts report progress to the terminal.
    files: ["scripts/**"],
    rules: { "no-console": "off" },
  },
  eslintConfigPrettier,
  {
    // A blank line around every function and export keeps files easy to scan.
    // Prettier leaves blank lines alone, so ESLint adds them (`eslint --fix`).
    rules: {
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: ["function", "export"] },
        { blankLine: "always", prev: ["function", "export"], next: "*" },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

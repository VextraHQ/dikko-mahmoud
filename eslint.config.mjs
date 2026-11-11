import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Modules that read draft bodies. Only server components, route files and
// tests may import them (see .claude/rules/structure.md).
const serverOnlyModules = [
  "@/content/profiles",
  "@/lib/people/profiles",
  "@/lib/people/directory-data",
  "@/lib/experience",
];

// Flags a "use client" file that imports a server-only module.
// Type-only imports are fine: they disappear from the bundle.
const noServerImportInClient = {
  meta: {
    type: "problem",
    messages: {
      serverOnly:
        "{{name}} is server-only. Client components must not import it; pass the data in as props.",
    },
  },
  create(context) {
    const first = context.sourceCode.ast.body[0];
    const isClientFile = first?.directive === "use client";

    if (!isClientFile) return {};

    return {
      ImportDeclaration(node) {
        const name = node.source.value;

        if (node.importKind !== "type" && serverOnlyModules.includes(name)) {
          context.report({ node, messageId: "serverOnly", data: { name } });
        }
      },
    };
  },
};

// Import direction: app → components → hooks → lib → content.
// Blocks imports that start with a `blocked` path, unless the whole path is
// in `allowed`. Type-only imports stay allowed.
const restrictImports = ({ blocked, allowed = [], message }) => {
  const exceptAllowed = allowed.length ? `(?!(${allowed.join("|")})$)` : "";

  return [
    "error",
    {
      patterns: [
        {
          regex: `^@/${exceptAllowed}(${blocked.join("|")})`,
          message,
          allowTypeImports: true,
        },
      ],
    },
  ];
};

const serverOnlyPaths = serverOnlyModules.map((name) => `${name.slice(2)}$`);

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
    plugins: {
      project: {
        rules: { "no-server-import-in-client": noServerImportInClient },
      },
    },
    rules: { "project/no-server-import-in-client": "error" },
  },
  {
    files: ["components/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        blocked: ["app/"],
        message: "Components must not import from app/.",
      }),
    },
  },
  {
    files: ["hooks/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        blocked: ["app/", "components/", ...serverOnlyPaths],
        // UI primitives may expose their own context hook (useCarousel).
        allowed: ["components/ui/.*"],
        message:
          "Hooks run in the browser: no app/, components/ or server-only modules.",
      }),
    },
  },
  {
    files: ["lib/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        blocked: ["app/", "components/", "hooks/"],
        message: "lib/ holds pure rules: no app/, components/ or hooks/.",
      }),
    },
  },
  {
    files: ["content/**"],
    rules: {
      "no-restricted-imports": restrictImports({
        blocked: ["app/", "components/", "hooks/", "lib/"],
        // Tiny helpers content may use.
        allowed: [
          "lib/content",
          "lib/publication",
          "lib/routes",
          "lib/insights/blocks",
        ],
        message:
          "content/ may only use tiny helpers from lib/ (content, publication, routes, insights/blocks). Put rules that combine content in lib/.",
      }),
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
    // Other sessions' git worktrees live here; they are not this checkout.
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;

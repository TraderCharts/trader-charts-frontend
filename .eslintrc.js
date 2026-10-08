module.exports = {
    // Parser
    parser: "@babel/eslint-parser",

    // Parser options for modern ECMAScript and JSX
    parserOptions: {
        ecmaVersion: 15, // ECMAScript 2024
        sourceType: "module", // Enable import/export
        ecmaFeatures: {
            jsx: true, // Enable JSX parsing
        },
        requireConfigFile: false, // No need for a separate Babel config
        babelOptions: {
            presets: ["@babel/preset-react"], // Enable JSX syntax
        },
    },

    // Environments
    env: {
        browser: true,
        es2024: true,
        node: true,
    },

    // Plugins
    plugins: ["react", "jsx-a11y", "import", "unused-imports"],

    // Extends recommended configurations
    extends: [
        "eslint:recommended", // Core JS best practices
        "plugin:react/recommended", // React-specific rules
        "plugin:jsx-a11y/recommended", // Accessibility rules
        "plugin:import/errors", // Import linting
        "plugin:import/warnings",
        "prettier", // Prettier integration (must be last)
    ],

    // React version detection
    settings: {
        react: {
            version: "detect",
        },
    },

    // Custom rules
    rules: {
        // Import rules
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": 0,
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "import/no-webpack-loader-syntax": 0,

        // React / JSX rules
        "react/jsx-filename-extension": 0,
        "react/no-array-index-key": 0,
        "react/no-did-mount-set-state": 0,
        "react/require-default-props": 0,

        // Accessibility rules
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/label-has-for": 0,

        // JS best practices
        "no-console": 0,
        "no-confusing-arrow": 0,
        "no-return-assign": 0,
        "no-mixed-operators": 0,

        // Style / code consistency (delegated to Prettier)
        semi: ["error", "always"], // Always require semicolons
        "arrow-parens": ["error", "always"], // Always use parentheses in arrow functions
        "prefer-const": ["error", { destructuring: "all" }], // Prefer const when possible
        "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn on unused variables, ignore args starting with _
        "no-undef": "error", // Disallow undefined variables
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
    },
};

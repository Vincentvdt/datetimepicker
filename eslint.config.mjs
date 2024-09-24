import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import tsParser from "@typescript-eslint/parser"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"


export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        ignores: ["/dist/*", "/src/*"],
        languageOptions: {
            parser: tsParser, // Use TypeScript parser
            ecmaVersion: "latest",
            sourceType: "module",
        },
        settings: {
            react: {
                version: "detect", // Automatically detect the React version
            },
        },
        plugins: {
            "react-hooks": reactHooksPlugin, // React Hooks plugin
            "jsx-a11y": jsxA11yPlugin, // Accessibility plugin
        },
        rules: {
            "react/react-in-jsx-scope": "off", // React 17+ does not require React import
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused args starting with `_`
            "jsx-a11y/anchor-is-valid": "off", // Example of a rule you might want to disable
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
]
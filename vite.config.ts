import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import dts from "vite-plugin-dts"; // Add this plugin

export default defineConfig({
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: [ "@emotion/babel-plugin" ],
            },
        }),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "lib/index.ts"),
            name: "Datetimepicker",
            fileName: (format) => `datetimepicker.${ format }.js`,
        },
        rollupOptions: {
            external: [ "react", "react-dom" ],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
        cssCodeSplit: true,
    },
});

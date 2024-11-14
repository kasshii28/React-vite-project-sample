/// <reference types="vitest"/>
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    TanStackRouterVite(),
  ],
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "./src/__test__/**/*.test.tsx",
      "./src/__test__/**/*.test.ts",
      "./src/__test__/**/*.stories.tsx",
      "./src/__test__/**/*.stories.ts",
      "./src/__test__/**/*.spec.tsx",
      "./src/__test__/**/*.spec.ts",
    ]
  },
})

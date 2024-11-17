# Install
```
pnpm add -D @biomejs/biome @tanstack/react-query @tanstack/react-router @tanstack/router-devtools @testing-library/jest-dom @tanstack/router-plugin @testing-library/react @testing-library/user-event postcss react-hook-form tailwind-merge tailwindcss vitest zod zustand clsx happy-dom
```

# main.tsx
```
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen' // Import the generated route tree

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClinet: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

// Render the app
const rootElement = document.getElementById('root') as HTMLElement
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClinet}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}
```

# Biome.jsonc
```
{
	"$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
	"vcs": {
		"enabled": false,
		"clientKind": "git",
		"useIgnoreFile": false
	},
	"files": {
		"ignoreUnknown": false,
		"ignore": []
	},
	"formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "ignore": [],
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
	},
	"json": {
		"parser": {
		"allowComments": true
		},
		"formatter": {
		"enabled": true,
		"indentStyle": "space",
		"indentWidth": 2,
		"lineWidth": 100
		}
	},
	"organizeImports": {
		"enabled": true
	},
	"linter": {
    "enabled": true,
    "rules": {
      "all": true,
      "suspicious": {
        "noExplicitAny": "off",
        // React 利用しているので off
        "noReactSpecificProps": "off"
      },
      "style": {
        // snake_case にしたいので off
        "useNamingConvention": "off",
        // default export を使いたいので off
        "noDefaultExport": "off",
        "useFilenamingConvention": "off"
      },
      "complexity": {
        "useSimplifiedLogicExpression": "off",
        "noExcessiveCognitiveComplexity": "off"
      }
   	 }
  	},
	"javascript": {
    "formatter": {
      "enabled": true,
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "trailingCommas": "all",
      "semicolons": "asNeeded",
      "arrowParentheses": "always",
      "indentStyle": "space",
      "indentWidth": 2,
      "lineWidth": 100,
      "quoteProperties": "asNeeded"
    }
  }
}
```

# vite.config.ts
```
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
```

# vitest.setup.ts
```
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import { afterEach } from "vitest";
export const user = userEvent.setup();

afterEach(() => {
  cleanup();
})
```

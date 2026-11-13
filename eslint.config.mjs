import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Build output and generated files (the eslint-config-next defaults,
    // repeated because globalIgnores replaces them)
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Static assets, served as they are
    'public/**',
    // Figma-generated design components, not edited by hand
    'src/imports/**',
    // Local tool folders from .gitignore. Flat config no longer skips
    // dotfolders, and .claude/worktrees/ holds whole copies of the repo.
    '.claude/**',
    '.playwright-mcp/**',
  ]),
])

export default eslintConfig

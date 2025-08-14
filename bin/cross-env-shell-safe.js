#!/usr/bin/env node

/**
 * Safe cross-env-shell replacement that addresses DEP0190 deprecation warning
 * This executable can be used instead of the original cross-env-shell command
 */

import { crossEnvShellSafe } from '../src/cross-env-safe.js';

// Get command line arguments (excluding node and script name)
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: cross-env-shell-safe VAR=value command [args...]');
  console.error('Example: cross-env-shell-safe NODE_ENV=production npm start');
  process.exit(1);
}

// Execute the safe shell version
crossEnvShellSafe(args);
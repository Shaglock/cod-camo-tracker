# Cross-Env Security Fix

This repository now includes a secure implementation of cross-env functionality that addresses the Node.js DEP0190 deprecation warning.

## Problem

The original `cross-env-shell` command uses `child_process.spawn()` with `shell: true` and passes arguments directly without proper escaping. This can lead to command injection vulnerabilities and triggers the following Node.js deprecation warning:

```
(node:35671) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated
```

## Solution

We've implemented a secure alternative that:

1. **Avoids shell=true with arguments**: When arguments are present, the implementation uses `shell: false` to prevent command injection
2. **Provides clear warnings**: When shell mode is requested with arguments, users are warned about potential security risks
3. **Maintains compatibility**: The API remains compatible with the original cross-env interface

## Files Added

- `src/cross-env-safe.js` - Safe implementation of cross-env functionality
- `src/cross-env-safe.ts` - TypeScript version with type definitions
- `bin/cross-env-shell-safe.js` - Drop-in replacement executable for cross-env-shell
- `src/cross-env-safe.test.js` - Unit tests for the safe implementation

## Usage

### As a library:
```javascript
import { crossEnvSafe, crossEnvShellSafe } from './src/cross-env-safe.js';

// Safe mode - uses shell=false when arguments are present
crossEnvSafe(['NODE_ENV=production', 'echo', 'hello', 'world']);

// Shell mode with warnings
crossEnvShellSafe(['NODE_ENV=production', 'echo', 'hello && echo dangerous']);
```

### As an executable:
```bash
# Instead of: npx cross-env-shell NODE_ENV=production echo "hello world"
node bin/cross-env-shell-safe.js NODE_ENV=production echo "hello world"
```

## Security Improvements

1. **Prevents command injection**: Arguments like `hello && rm -rf /` are treated as literal strings, not shell commands
2. **Clear warnings**: Users are informed when potentially unsafe operations are attempted
3. **Selective shell usage**: Shell mode is only enabled when safe (no arguments) or explicitly requested with warnings

## Testing

Run the comparison test to see the difference between the original and safe implementations:

```bash
npm run test:cross-env
```

This will demonstrate:
- Original cross-env-shell executing shell injection attacks
- Safe implementation preventing such attacks
- Appropriate warnings for unsafe usage patterns

## Compatibility

The safe implementation maintains full API compatibility with the original cross-env while providing enhanced security. It can be used as a drop-in replacement in most scenarios.
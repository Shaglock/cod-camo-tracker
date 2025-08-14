/**
 * Better test for the safe cross-env implementation that doesn't exit early
 */

import { spawn } from 'child_process';

console.log('Testing cross-env implementations...');

// Test the original cross-env-shell that should produce the deprecation warning
console.log('\n=== Test 1: Original cross-env-shell (may show deprecation warning) ===');
const originalTest = spawn('npx', ['cross-env-shell', 'NODE_ENV=test', 'echo', 'hello && echo dangerous'], {
  stdio: 'inherit'
});

originalTest.on('exit', (code) => {
  console.log(`Original cross-env-shell test completed with code: ${code}`);
  
  console.log('\n=== Test 2: Our safe implementation ===');
  // Test our safe implementation
  const safeTest = spawn('node', ['-e', `
    import { crossEnvSafe } from './src/cross-env-safe.js';
    const proc = crossEnvSafe(['NODE_ENV=test', 'echo', 'hello && echo this will not execute as shell command']);
    if (!proc) {
      console.log('No process was created');
      process.exit(0);
    }
  `], {
    stdio: 'inherit'
  });
  
  safeTest.on('exit', (code) => {
    console.log(`Safe implementation test completed with code: ${code}`);
    
    console.log('\n=== Test 3: Safe shell mode with warning ===');
    // Test shell mode with warning
    const shellTest = spawn('node', ['-e', `
      import { crossEnvShellSafe } from './src/cross-env-safe.js';
      const proc = crossEnvShellSafe(['NODE_ENV=test', 'echo', 'hello', 'world']);
      if (!proc) {
        console.log('No process was created');
        process.exit(0);
      }
    `], {
      stdio: 'inherit'
    });
    
    shellTest.on('exit', (code) => {
      console.log(`Shell safe test completed with code: ${code}`);
      console.log('\nAll tests completed!');
    });
  });
});
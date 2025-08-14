/**
 * Safe implementation of cross-env functionality that addresses DEP0190 deprecation warning
 * This file provides a secure alternative to cross-env-shell that doesn't use shell=true with arguments
 */

import { spawn, SpawnOptions } from 'child_process';
import { platform } from 'os';

interface CrossEnvOptions {
  shell?: boolean;
  stdio?: 'inherit' | 'pipe' | 'ignore';
}

interface EnvSetter {
  [key: string]: string;
}

const envSetterRegex = /(\w+)=('(.*)'|"(.*)"|(.*))/;

/**
 * Parse command line arguments to extract environment variables and command
 */
function parseCommand(args: string[]): [EnvSetter, string | null, string[]] {
  const envSetters: EnvSetter = {};
  let command: string | null = null;
  let commandArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const match = envSetterRegex.exec(arg);
    if (match && match[1]) {
      let value: string;
      if (typeof match[3] !== 'undefined') {
        value = match[3];
      } else if (typeof match[4] === 'undefined') {
        value = match[5] || '';
      } else {
        value = match[4];
      }
      envSetters[match[1]] = value;
    } else {
      // No more env setters, the rest of the line must be the command and args
      command = arg;
      commandArgs = args.slice(i + 1);
      break;
    }
  }

  return [envSetters, command, commandArgs];
}

/**
 * Get environment variables combining process.env with custom setters
 */
function getEnvVars(envSetters: EnvSetter): NodeJS.ProcessEnv {
  const envVars = { ...process.env };
  
  Object.keys(envSetters).forEach((varName) => {
    const value = envSetters[varName];
    if (value !== undefined) {
      envVars[varName] = value;
    }
  });

  return envVars;
}

/**
 * Safely execute a command with environment variables
 * This addresses the DEP0190 warning by using shell=false when arguments are present
 */
export function crossEnvSafe(args: string[], options: CrossEnvOptions = {}): any {
  const [envSetters, command, commandArgs] = parseCommand(args);
  const env = getEnvVars(envSetters);

  if (!command) {
    return null;
  }

  // Safe spawn options - avoid shell=true with arguments to prevent DEP0190 warning
  const spawnOptions: SpawnOptions = {
    stdio: options.stdio || 'inherit',
    env,
    // Only use shell when there are no arguments, or when explicitly requested for single commands
    shell: options.shell && commandArgs.length === 0
  };

  // If shell is requested but we have arguments, we need to handle this safely
  if (options.shell && commandArgs.length > 0) {
    console.warn('Warning: shell=true with arguments can be unsafe. Using shell=false for security.');
    spawnOptions.shell = false;
  }

  // Handle Windows command extensions
  if (platform() === 'win32' && !spawnOptions.shell) {
    if (command.endsWith('.cmd') || command.endsWith('.bat')) {
      spawnOptions.shell = true;
      console.warn('Using shell=true for Windows batch file, ensure arguments are trusted.');
    }
  }

  const proc = spawn(command, commandArgs, spawnOptions);

  // Handle process signals
  const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGBREAK', 'SIGHUP'];
  signals.forEach(signal => {
    process.on(signal, () => {
      proc.kill(signal);
    });
  });

  proc.on('exit', (code, signal) => {
    let crossEnvExitCode = code;
    // exit code could be null when OS kills the process(out of memory, etc) or due to node handling it
    // but if the signal is SIGINT the user exited the process so we want exit code 0
    if (crossEnvExitCode === null) {
      crossEnvExitCode = signal === 'SIGINT' ? 0 : 1;
    }
    process.exit(crossEnvExitCode);
  });

  return proc;
}

/**
 * Safe cross-env-shell alternative
 * Only uses shell when safe to do so
 */
export function crossEnvShellSafe(args: string[]): any {
  // For shell mode, we need to be extra careful
  // If there are arguments, we should warn about potential risks
  const [envSetters, command, commandArgs] = parseCommand(args);
  
  if (commandArgs.length > 0) {
    console.warn('Warning: Using shell mode with arguments. Ensure all arguments are trusted to prevent command injection.');
  }

  return crossEnvSafe(args, { shell: true });
}
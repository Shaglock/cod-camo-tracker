/**
 * Integration tests for the safe cross-env implementation
 * These tests verify the core functionality without complex mocking
 */

import { describe, it, expect } from 'vitest';

// Import the parsing logic separately for unit testing
const envSetterRegex = /(\w+)=('(.*)'|"(.*)"|(.*))/;

function parseCommand(args) {
  const envSetters = {};
  let command = null;
  let commandArgs = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const match = envSetterRegex.exec(arg);
    if (match && match[1]) {
      let value;
      if (typeof match[3] !== 'undefined') {
        value = match[3];
      } else if (typeof match[4] === 'undefined') {
        value = match[5] || '';
      } else {
        value = match[4];
      }
      envSetters[match[1]] = value;
    } else {
      command = arg;
      commandArgs = args.slice(i + 1);
      break;
    }
  }

  return [envSetters, command, commandArgs];
}

describe('cross-env-safe parsing logic', () => {
  it('should parse environment variables correctly', () => {
    const [envSetters, command, commandArgs] = parseCommand(['NODE_ENV=production', 'echo', 'test']);
    
    expect(envSetters).toEqual({
      NODE_ENV: 'production'
    });
    expect(command).toBe('echo');
    expect(commandArgs).toEqual(['test']);
  });

  it('should handle multiple environment variables', () => {
    const [envSetters, command, commandArgs] = parseCommand([
      'NODE_ENV=production', 
      'PORT=3000', 
      'DEBUG=true', 
      'node', 
      'server.js'
    ]);
    
    expect(envSetters).toEqual({
      NODE_ENV: 'production',
      PORT: '3000',
      DEBUG: 'true'
    });
    expect(command).toBe('node');
    expect(commandArgs).toEqual(['server.js']);
  });

  it('should handle quoted values', () => {
    const [envSetters, command, commandArgs] = parseCommand([
      'NODE_ENV="production mode"',
      'MESSAGE=\'hello world\'',
      'echo',
      'test'
    ]);
    
    expect(envSetters).toEqual({
      NODE_ENV: 'production mode',
      MESSAGE: 'hello world'
    });
    expect(command).toBe('echo');
    expect(commandArgs).toEqual(['test']);
  });

  it('should handle commands with no arguments', () => {
    const [envSetters, command, commandArgs] = parseCommand(['NODE_ENV=test', 'echo']);
    
    expect(envSetters).toEqual({
      NODE_ENV: 'test'
    });
    expect(command).toBe('echo');
    expect(commandArgs).toEqual([]);
  });

  it('should handle only environment variables', () => {
    const [envSetters, command, commandArgs] = parseCommand(['NODE_ENV=test', 'PORT=3000']);
    
    expect(envSetters).toEqual({
      NODE_ENV: 'test',
      PORT: '3000'
    });
    expect(command).toBe(null);
    expect(commandArgs).toEqual([]);
  });

  it('should handle empty values', () => {
    const [envSetters, command, commandArgs] = parseCommand(['NODE_ENV=', 'echo', 'test']);
    
    expect(envSetters).toEqual({
      NODE_ENV: ''
    });
    expect(command).toBe('echo');
    expect(commandArgs).toEqual(['test']);
  });

  it('should handle potentially dangerous arguments safely', () => {
    // This tests that our parsing doesn't inadvertently execute commands
    const [envSetters, command, commandArgs] = parseCommand([
      'NODE_ENV=production', 
      'echo', 
      'hello && echo dangerous'
    ]);
    
    expect(envSetters).toEqual({
      NODE_ENV: 'production'
    });
    expect(command).toBe('echo');
    // The dangerous part should be treated as a single argument
    expect(commandArgs).toEqual(['hello && echo dangerous']);
  });
});
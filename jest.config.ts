// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
  },
  transformIgnorePatterns: ["ts-jest"],
  // testTimeout: 30000,
};
export default config;

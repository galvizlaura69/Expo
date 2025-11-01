module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-navigation|expo(nent)?|@expo(nent)?|@unimodules|unimodules|sentry-expo|native-base|react-clone-referenced-element)',
  ],
  testMatch: [
    '**/src/tests/**/*.test.ts?(x)', 
    '**/__tests__/**/*.test.ts?(x)'  
  ],
};

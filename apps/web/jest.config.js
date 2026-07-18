module.exports = {
  displayName: 'web',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: 'app',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  collectCoverageFrom: ['**/*.(t|j)s?(x)'],
  coverageDirectory: '../coverage',
  passWithNoTests: true,
};

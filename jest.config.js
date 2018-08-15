module.exports = {
  bail: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/'],
  transform: {
    ['^.+\\.jsx?$']: 'babel-jest'
  }
};

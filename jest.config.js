module.exports = {
  bail: true,
  testEnvironment: 'node',
  transform: {
    ['^.+\\.jsx?$']: 'babel-jest'
  }
};

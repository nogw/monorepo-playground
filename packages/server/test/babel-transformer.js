/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('@fp/babel');

const { createTransformer } = require('babel-jest').default;

module.exports = createTransformer({
  ...config,
});

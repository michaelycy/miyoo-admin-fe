const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugs = require('postcss-flexbugs-fixes');
const postcssSorting = require('postcss-sorting');

/**
 * @see https://postcss.org/
 * @type {import('postcss').AcceptedPlugin}
 */
module.exports = {
  plugins: [postcssPresetEnv(), postcssFlexbugs(), postcssSorting()],
};

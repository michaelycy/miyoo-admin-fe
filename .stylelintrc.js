/**
 * @see: https://stylelint.io
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-prettier/recommended',
  ],
  fix: true,
  plugins: ['stylelint-order'], // 配置stylelint less拓展插件
  rules: {},
};

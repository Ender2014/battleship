module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },

  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
  },
};

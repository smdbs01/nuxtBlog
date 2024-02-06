module.exports = {
  root: true,
  plugins: ["security-node"],
  extends: [
    "@nuxt/eslint-config",
    "plugin:tailwindcss/recommended",
    "plugin:security-node/recommended",
  ],
  rules: {
    "tailwindcss/no-custom-classname": 0,
  },
};

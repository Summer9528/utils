module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    parserOptions: {
        sourceType: "module",
    },
    extends: ["eslint:recommended"],
    rules: {
        "no-console": "warn",
        "no-unused-vars": "off",
        "no-console": "off"
    }
}

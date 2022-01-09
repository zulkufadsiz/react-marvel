module.exports = api => {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          corejs: "3.8",
          useBuiltIns: "entry",
          targets: {
            browsers: [
              "edge >= 16",
              "safari >= 9",
              "firefox >= 57",
              "ie >= 11",
              "ios >= 9",
              "chrome >= 49"
            ]
          }
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-json-strings",
      ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }]
    ]
  };
};

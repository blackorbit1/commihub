// config-overrides.js
module.exports = function override(config, env) {
  // Add your webpack configuration modifications here.
  // For example, to ignore source map files:
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  return config;
};
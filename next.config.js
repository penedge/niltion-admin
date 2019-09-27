const withCSS = require("@zeit/next-css");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports =
  withCSS({
    webpack(config, options) {
      config.optimization.minimizer = [];
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      return config;
    }
  },
  {compress: true}
);
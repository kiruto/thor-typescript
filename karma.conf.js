/**
 * Created by yuriel on 2/9/17.
 */
var webpackConfig = require('./webpack.config');
var browsers, customLaunchers;

if (webpackConfig.__debug__) {
  browsers = ["Chrome"];
  customLaunchers = null;
} else {
  browsers = ["PhantomJS", "PhantomJS_custom"];
  customLaunchers = {
    'PhantomJS_custom': {
      base: 'PhantomJS',
      options: {
        windowName: 'my-window',
        settings: {
          webSecurityEnabled: false
        },
      },
      flags: ['--load-images=true'],
      debug: true
    }
  }
}

module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript", 'mocha', 'chai', 'sinon'],
    files: [
      { pattern: "src/**/*.spec.ts", watched: webpackConfig.__debug__ },
    ],
    preprocessors: {
      "src/**/*.spec.ts": ["webpack"],
    },
    webpack: /*require('./webpack.config')*/{
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins
    },
    reporters: ["progress", "karma-typescript"],
    browsers: browsers,
    customLaunchers: customLaunchers,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    }
  });
};
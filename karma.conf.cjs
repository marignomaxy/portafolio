const fs = require('node:fs');
if (!process.env.CHROME_BIN && process.platform === 'win32') {
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
  ];
  const browser = candidates.find(candidate => fs.existsSync(candidate));
  if (browser) process.env.CHROME_BIN = browser;
}
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [require('karma-jasmine'), require('karma-chrome-launcher'), require('@angular-devkit/build-angular/plugins/karma')],
    reporters: ['progress'], browsers: ['ChromeHeadless'], singleRun: true,
    browserNoActivityTimeout: 30000, captureTimeout: 60000, client: {clearContext: false}
  });
};

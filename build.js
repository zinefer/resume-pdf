const fs   = require("fs"),
      path = require('path');

const pug = require('pug'),
      pdf = require('chrome-headless-render-pdf');

const isWsl = require('is-wsl');

var data = require('./src/data.js');
var html = pug.renderFile('src/index.pug', data);

fs.copyFile('static/logo.svg', 'dist/logo.svg', (err) => {
  if (err) return console.log(err);

  fs.writeFile('dist/index.html', html, function(err) {
    if (err) return console.log(err);

    var pathToHtml = path.join(__dirname, 'dist/index.html'),
        pdfOptions = { noMargins: true };

    if (isWsl) {
      pdfOptions.chromeBinary = 'chrome.exe';
      pathToHtml = pathToHtml.replace('/mnt/c/', 'C://');
    }

    pdf.generateSinglePdf(pathToHtml, 'dist/resume.pdf', pdfOptions);
  });

});
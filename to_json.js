var Xray = require('x-ray');
var x = Xray();

var fs = require('fs');

// get contents of html file
function readContent(callback) {
  fs.readFile('./html-snapshots/stats-table-7515.html', 'utf-8', function (err, content) {
    if (err) return callback(err)
    callback(null, content)
  })
}

var html;
readContent(function (err, content) {
  x(content, 'td.first a',
  [{
    name: '',
    url: '@href'
  }])
  .write('results.json');
})

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
  x(content, 'tbody tr',
  [{
    name: 'td.first',
    team: 'td:nth-child(3)',
    big_chances: 'td:nth-child(4)',
    chances_created: 'td:nth-child(5)',
    shots_inside_box: 'td:nth-child(11)',
    shots_on_target: 'td:nth-child(12)',
    touches_penalty_area: 'td:nth-child(13)'
  }])
  .write('results.json');
})

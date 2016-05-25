var path = require('path')
var read = require('fs').readFileSync
var html = read(path.resolve(__dirname, 'html-snapshots/stats-table-7515.html'))
var Xray = require('x-ray')
var x = Xray()

x(html, 'tbody tr',
[{
  name: 'td.first',
  team: 'td:nth-child(3)',
  big_chances: 'td:nth-child(4)',
  chances_created: 'td:nth-child(5)',
  shots_inside_box: 'td:nth-child(11)',
  shots_on_target: 'td:nth-child(12)',
  touches_penalty_area: 'td:nth-child(13)'
}])
.write('results.json')

var path = require('path')
var read = require('fs').readFileSync
var html = read(path.resolve(__dirname, 'html-snapshots/stats-table-7515.html'))
var Xray = require('x-ray')
var x = Xray()

module.exports = {
  // accepts single dataStructure param
  // used as the strucuted selector for the x-ray method call
  capture: function (dataStructure) {
    x(html, 'tbody tr', dataStructure).write('results.json')
  }
}

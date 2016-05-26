var path = require('path')
var read = require('fs').readFileSync
var Xray = require('x-ray')
var x = Xray()

module.exports = function() {
  this.capture = function(srcPath, outputPath, dataStructure) {
    var html = read(path.resolve(__dirname, srcPath))
    x(html, 'tbody tr', dataStructure).write(outputPath)
  }
}

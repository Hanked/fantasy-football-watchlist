var path = require('path')
var read = require('fs').readFileSync
var Xray = require('x-ray')

// create new xray instance
var x = Xray({
  // create a filter to be used below
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    }
  }
});

module.exports = function() {
  this.capture = function(srcPath, outputPath, dataStructure) {
    var html = read(path.resolve(__dirname, srcPath))
    x(html, 'tbody tr', dataStructure).write(outputPath)
  }
}

var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: true })

module.exports = function(username, password) {
  this.init = function() {
    // run automation
    nightmare
      .goto('http://members.fantasyfootballscout.co.uk/')
      .wait(60000)
      .cookies.clear('ffs_members')
      .end()

      .then(function() {
        console.log('logout');
      })

      .catch(function (error) {
        console.error('Search failed:', error)
      })
  }
}

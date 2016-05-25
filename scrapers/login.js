var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: true })

module.exports = function(username, password) {
  // get credentials to authenticate
  this.username = username;
  this.password = password;

  this.init = function() {
    // run automation
    nightmare
      // go to personal 'goal threat' stats table
      .goto('http://members.fantasyfootballscout.co.uk/')

      // authenticate
      .wait('form.login')
      .type('form.login [name=username]', this.username)
      .type('form.login [name=password]', this.password)
      .click('form.login [type=submit]')

      .wait('#content')
      .end()
      .then(function() {
        console.log('login');
      })

      .catch(function (error) {
        console.error('Search failed:', error)
      })
  }
}

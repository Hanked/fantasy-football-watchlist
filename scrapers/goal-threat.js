var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: true })
var toJson = require('./../utils/to-json.js')
var j = new toJson();

module.exports = function(username, password) {
  // get credentials to authenticate
  this.username = username;
  this.password = password;
  this.htmlExportPath = './html-snapshots/goal-threat.html';

  this.getData = function() {
    // run automation
    nightmare
      // go to personal 'goal threat' stats table
      .goto('http://members.fantasyfootballscout.co.uk/my-stats-tables/view/7515/')

      // authenticate
      .wait('form.login')
      .type('form.login [name=username]', this.username)
      .type('form.login [name=password]', this.password)
      .click('form.login [type=submit]')

      // create file containing html page src
      .wait('table.stats')
      .html(this.htmlExportPath, 'HTMLOnly')

      // logout so that next browser instance starts with a clean session
      // wait times can potentially be reduced, was having problems without them
      .wait(5000)
      .goto('http://members.fantasyfootballscout.co.uk/logout')
      .wait(5000)
      .end()

      .then(function(result) {
        //output json data
        j.capture(
          './../html-snapshots/goal-threat.html',
          './json-snapshots/goal-threat.json',
          [{
            name: 'td.first',
            team: 'td:nth-child(3)',
            big_chances: 'td:nth-child(4)',
            chances_created: 'td:nth-child(5)',
            shots_inside_box: 'td:nth-child(11)',
            shots_on_target: 'td:nth-child(12)',
            touches_penalty_area: 'td:nth-child(13)'
          }]
        );
      })

      .catch(function (error) {
        console.error('Search failed:', error)
      })
  }
}
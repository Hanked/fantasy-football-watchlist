var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: true })
var toJson = require('./../utils/to-json.js')
var j = new toJson();

module.exports = function() {
  this.htmlExportPath = './html-snapshots/team-stats.html';

  this.getData = function() {
    // run automation
    nightmare
      // go to personal 'goal threat' stats table
      .wait(6000)
      .goto('http://members.fantasyfootballscout.co.uk/my-stats-tables/view/11619/')

      // create file containing html page src
      .wait('table.stats')
      .html(this.htmlExportPath, 'HTMLOnly')

      .wait(5000)
      .end()

      .then(function(result) {
        //output json data
        j.capture(
          './../html-snapshots/team-stats.html',
          './json-snapshots/team-stats.json',
          [{
            team: 'td.first',
            big_chances: 'td:nth-child(2)',
            big_chances_conceded: 'td:nth-child(3)',
            chances_created: 'td:nth-child(4)',
            crosses_successful: 'td:nth-child(5)',
            goal_attempts_in_box_conceded: 'td:nth-child(7)',
            shots_inside_box: 'td:nth-child(10)',
            shots_on_target: 'td:nth-child(11)',
          }]
        );

        console.log('team threat');
      })

      .catch(function (error) {
        console.error('Search failed:', error)
      })
  }
}

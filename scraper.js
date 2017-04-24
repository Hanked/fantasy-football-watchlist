var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: true })
var toJson = require('./utils/to-json.js')
var j = new toJson();

// capture script params
var username = process.argv[2]
var password = process.argv[3]

// run automation
nightmare
  // get clean session
  .goto('http://members.fantasyfootballscout.co.uk/')
  .cookies.clear('ffs_members')
  .refresh()

  // authenticate
  .wait('form.login')
  .type('form.login [name=username]', username)
  .type('form.login [name=password]', password)
  .click('form.login [type=submit]')
  .wait('#content')

  // get team stats
  .goto('http://members.fantasyfootballscout.co.uk/my-stats-tables/view/11619/')
  .wait('table.stats')
  .html('./html-snapshots/team-stats.html', 'HTMLOnly')
  .wait(5000)

  // get goal threat
  .goto('http://members.fantasyfootballscout.co.uk/my-stats-tables/view/7515/')
  .wait('table.stats')
  .html('./html-snapshots/goal-threat.html', 'HTMLOnly')
  .wait(5000)
  .end()
  .then(function(result) {
    j.capture(
      './../html-snapshots/team-stats.html',
      './json-snapshots/team-stats.json',
      [{
        team: 'td.first | trim',
        big_chances: 'td:nth-child(2)',
        big_chances_conceded: 'td:nth-child(3)',
        chances_created: 'td:nth-child(4)',
        crosses_successful: 'td:nth-child(5)',
        goal_attempts_in_box_conceded: 'td:nth-child(7)',
        shots_inside_box: 'td:nth-child(10)',
        shots_on_target: 'td:nth-child(11)'
      }]
    );

    j.capture(
      './../html-snapshots/goal-threat.html',
      './json-snapshots/goal-threat.json',
      [{
        name: 'td.first',
        team: 'td:nth-child(3) | trim',
        big_chances: 'td:nth-child(4)',
        chances_created: 'td:nth-child(5)',
        shots_inside_box: 'td:nth-child(10)',
        shots_on_target: 'td:nth-child(11)',
        touches_penalty_area: 'td:nth-child(12)'
      }]
    );
  })

  .catch(function (error) {
    console.error('Search failed:', error)
  })

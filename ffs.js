var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })

// capture script params
var username = process.argv[2];
var password = process.argv[3];

// run automation
nightmare
  // go to personal 'goal threat' stats table
  .goto('http://members.fantasyfootballscout.co.uk/my-stats-tables/view/7515/')

  // authenticate
  .wait('form.login')
  .type('form.login [name=username]', username)
  .type('form.login [name=password]', password)
  .click('form.login [type=submit]')

  // create file containing html page src
  .wait('table.stats')
  .html('html-snapshots/stats-table-7515.html', 'HTMLOnly')

  // logout so that next browser instance starts with a clean session
  // wait times can potentially be reduced, was having problems without them
  .wait(5000)
  .goto('http://members.fantasyfootballscout.co.uk/logout')
  .wait(5000)
  .end()

  .catch(function (error) {
    console.error('Search failed:', error);
  });

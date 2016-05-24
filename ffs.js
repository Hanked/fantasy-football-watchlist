var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })

// capture script params
var username = process.argv[2];
var password = process.argv[3];

// generate readable timestamp
var dateString = function() {
  var date = new Date();
  var d = date.getDate();
  var mo = date.getMonth() + 1;
  var y = date.getFullYear();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();

  return ''+y+mo+d+h+mi+s;
}

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
  .html('html-snapshots/' + dateString() + '.html', 'HTMLOnly')

  // .evaluate(function () {
  //   return document.querySelector('table.stats tbody td.first a').text
  // })

  // logout so that next browser instance starts with a clean session
  .wait(5000)
  .goto('http://members.fantasyfootballscout.co.uk/logout')
  .wait(5000)
  .end()

  // .then(function (result) {
  //   console.log(result)
  // })

  .catch(function (error) {
    console.error('Search failed:', error);
  });

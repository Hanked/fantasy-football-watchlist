// capture script params
var username = process.argv[2]
var password = process.argv[3]

// scrapers
var GoalThreat = require('./scrapers/goal-threat.js')

// init scrapers
var gt = new GoalThreat(username, password)
gt.getData();

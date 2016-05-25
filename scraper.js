// capture script params
var username = process.argv[2]
var password = process.argv[3]

// include scrapers
var Login = require('./scrapers/login.js')
var GoalThreat = require('./scrapers/goal-threat.js')
var TeamStats = require('./scrapers/team-stats.js')
var Logout = require('./scrapers/logout.js')

// new scrapers instances
var li = new Login(username, password)
var gt = new GoalThreat()
var ts = new TeamStats()
var lo = new Logout()

// init scrapers
li.init()
gt.getData()
ts.getData()
lo.init()

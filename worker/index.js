var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github')

console.log("Cron fetch worker running...");

// fetch github jobs
new CronJob('0 0 * * *', fetchGithub, null, true, 'America/Los_Angeles');
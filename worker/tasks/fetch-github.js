require('dotenv').config()

var fetch = require('node-fetch');
var redis = require('redis');
var client = redis.createClient({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PW,
    });

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {

    console.log('fetching github');

    let resultCount = 1, onPage = 0;
    const workingList = [];

    // fetch and compile list
    while(resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`);
        console.log('fetching page ', onPage);

        try {
            const list = await res.json();
            console.log('successfully retrieved page ', onPage);

            workingList.push(...list);
            console.log('got ', list.length, ' jobs');

            resultCount = list.length;
            onPage++;
        } catch(err) {
            console.log('An unexpected error was encountered on page ', onPage, '.');
            console.log('-- -- -- \n', err, '\n-- -- --');
            console.log('Trying again...');
        }       
    }

    console.log('got', workingList.length, 'jobs');

    // filter out all non-junior jobs
    const juniorJobs = workingList.filter(item => {
        const itemTitle = item.title.toLowerCase();

        if(
            itemTitle.includes('senior') ||
            itemTitle.includes('sr.') ||
            itemTitle.includes('manager') ||
            itemTitle.includes('architect')
        ) {
            return false
        }
        return true;
    })

    console.log('filtered down to ', juniorJobs.length, ' junior jobs');

    // promise resolution
    const success = await setAsync('github', JSON.stringify(juniorJobs));

    console.log({success});
}

module.exports = fetchGithub;

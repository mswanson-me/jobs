const express = require('express')
const app = express()
const port = 3001

require('dotenv').config()

var redis = require('redis');
var client = redis.createClient({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PW,
    });

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get('/api/list', async (req, res) => {

    const list = await getAsync('github');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return res.send(list)
})

app.listen(port, () => console.log(`API listening at http://localhost:${port}`))
const fs = require('fs');
const express = require('express');
const router = express.Router();
const passwords = {};
const sqlight  = require('sqlite');

function auth(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(403).send('Permission denied');
    }
}

function injectUserIfExist(req, res, next) {
    if (req.cookies.sessionid) {
        sqlight.get('select * from users where session_id = ?', req.cookies.sessionid)
            .then(e=> {
                req.user = e && e.login;
                next();
            }).catch(onError(res))
    } else {
        next()
    }
}

function onError(res) {
    return (e) => {
        res.status(500).json(e);
    }
}

function render(file, params) {
    let data = fs.readFileSync(`./public/${file}.html`, 'utf8');
    const template = fs.readFileSync(`./public/main.html`, 'utf8');
    let preparedTemplate = template.replace(/\{body}/g, (e, n) => data);
    if (params) {
        preparedTemplate = preparedTemplate.replace(/\{(\w+)}/g, (e, n) => params[n]);
    }
    return preparedTemplate;
}

function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
sqlight.open('./database.sqlite', { cached: true })

module.exports = {render, makeid, router, auth, injectUserIfExist, passwords, sqlight, onError};
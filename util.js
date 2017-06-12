const fs = require('fs');
const express = require('express');
const router = express.Router();
const db = {sessions: {}};
const template = fs.readFileSync(`./public/main.html`, 'utf8');
const passwords = {};

function auth(req, res, next) {
    if (req.user != 'anonymous') {
        next()
    } else {
        res.status(403).send('Permission denied');
    }
}

function injectUserIfExist(req, res, next) {
    req.user = db.sessions[req.cookies.sessionid] || 'anonymous';
    next();
}

function render(file, params) {
    let data = fs.readFileSync(`./public/${file}.html`, 'utf8');
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


module.exports = {render, makeid, router, db, auth, injectUserIfExist, passwords};
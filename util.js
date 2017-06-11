const fs = require('fs');
const express = require('express');
const router = express.Router();
const db = {sessions: {}};

function auth(req, res, next) {
    let cookie = req.cookie;
    if (cookie) {
        req.user = db.sessions[cookie];
        if (req.user) {
            next()
        } else {
            res.status(403).send('Invalid cookie');
        }
    } else {
        res.status(403).send('Auth required');
    }
}

function injectUserIfExist(req, res, next) {
    req.user = db.sessions[req.cookies.sessionid];
    next();
}

function render(file, params) {
    let data = fs.readFileSync(`./public/${file}.html`, 'utf8');
    if (params) {
        data = data.replace(/\{(\w+)}/g, (e, n) => params[n]);
    }
    return data;
}

function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


module.exports = {render, makeid, router, db, auth, injectUserIfExist};
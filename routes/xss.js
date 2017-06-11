const {render, makeid, injectUserIfExist, router} = require('../util');
const resultExist = ['puppy', 'kitty'];
const forumMessages = [];

router.get('/search', (req, res) => {
    let searchStr = req.query.search;
    let resMap = {};
    if (resultExist.includes(searchStr)) {
        resMap.results = `${searchStr} exist!`;
    } else {
        resMap.results = `${searchStr} not found :(`;
    }
    res.write(render('xss/npers', resMap));
    res.end();
});

router.get('/forum', (req, res) => {
    let messages = '';
    for (let message of forumMessages) {
        messages += `<div>${message}</div>`;
    }
    res.write(render('xss/pers', {messages}));
    res.end();
});

router.post('/addMessage', injectUserIfExist, (req, res) => {
    forumMessages.push(`<b>${req.user}</b>: ${req.body.message}`);
    res.redirect('/forum');
});

module.exports = router;
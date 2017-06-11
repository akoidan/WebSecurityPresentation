const {render, makeid, router} = require('../util');
const resultExist = ['puppy', 'kitty'];
const forumMessages = [];

router.get('/search',  (req, res) => {
    let searchStr = req.query.search;
    let resMap = {user: req.user};
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
    res.write(render('xss/pers', {messages, user: req.user}));
    res.end();
});

router.get('/hackSomeone', (req, res) => {
    res.write(render('xss/self', {user: req.user}));
    res.end();
});


router.post('/addMessage', (req, res) => {
    forumMessages.push(`<b>${req.user}</b>: ${req.body.message}`);
    res.redirect('/forum');
});

module.exports = router;
const {render, makeid, router} = require('../util');
const resultExist = ['puppy', 'kitty'];

router.get('/search', (req, res) => {
    let searchStr = req.query.search;
    let resMap = {};
    if (resultExist.includes(searchStr)) {
        resMap.results = `${searchStr} exist!`;
    } else {
        resMap.results = `${searchStr} not found :(`;
    }
    res.write(render('xss', resMap));
    res.end();
});

module.exports = router;
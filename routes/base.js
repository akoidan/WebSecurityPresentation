const {render, makeid, router} = require('../util');

router.get('/cookie',  (req, res) => {
    res.write(render('base/cookie', {user: req.user}));
    res.end();
});

router.post('/setCookie',  (req, res) => {
    res.cookie(req.body.name, req.body.value, {maxAge: parseInt(req.body.maxAge), httpOnly: req.body.httpOnly == 'true'});
    res.status(200).send();
});

module.exports = router;
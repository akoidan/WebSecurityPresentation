const {render, makeid, router, db, auth, passwords} = require('../util');

router.get('/preflight',  (req, res) => {
    res.write(render('preflight/preflight', {user: req.user}));
    res.end();
});

router.put('/dummy', (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.status(200).json({message: 'ok'});
});


router.post('/dummy', (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.status(200).json({message: 'ok'});
});


router.options('/dummy', (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "custom_header, Content-Type");
    res.header('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.status(200).send();

});
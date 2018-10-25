// this hooks up the router so we can have separate route files
const router = require('express').Router();

//add your route here 
router.use('/', require('./users.js'));
//router.use('/', require('./sampleroute.js'));

module.exports = router;

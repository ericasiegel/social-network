// connect to express router
const router = require('express').Router();
// connect to the api routes
const apiRoutes = require('./api');
// connect to html routes
// const htmlRoutes = require('./html/html-routes'); ** dont need yet **

// add prefix of '/api' to all of the api routes imported from the 'api' directory
router.use('/api', apiRoutes);
// router.use('/', htmlRoutes); ** dont need yet **

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
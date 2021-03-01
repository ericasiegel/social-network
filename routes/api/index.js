// connect to express router
const router = require('express').Router();
//connect to pizza routes
const userRoutes = require('./user-routes');

// add prefix of '/pizzas' to routes created in 'pizza-routes.js'
router.use('/users', userRoutes);


//export the router
module.exports = router;
// connect to express router
const router = require('express').Router();
//connect to user routes
const userRoutes = require('./user-routes');
//connect to thought routes
const thoughtRoutes = require('./thought-routes');

// add prefix of '/users' to routes created in 'user-routes.js'
router.use('/users', userRoutes);
// add prefix of '/thoughts' to routes created in 'thought-routes.js'
router.use('/thoughts', thoughtRoutes);


//export the router
module.exports = router;
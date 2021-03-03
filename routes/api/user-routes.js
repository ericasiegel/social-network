// connect to the express router
const router = require('express').Router();

// desctructure the names out of the imported object and use them directly
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/Users
router
    .route('/')
    // provide the name o the controller method as the callback
    // it is why we set up the methods with (req, res)
    .get(getAllUsers)
    .post(createUser);

// set up GET one, PUT, and DELETE at /api/Users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// set up POST for friends
router
    .route('/:userId/friends/:friendId')
    .post(addFriend);

// set up delete for friends
router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend);

module.exports = router;
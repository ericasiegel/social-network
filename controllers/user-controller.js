// connect to the User model
const { User } = require('../models');

// user controller method functions
const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            // populate the thought fields into the get request
            .populate({
                // set the path to the thoughts
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v') // indicate we don't want to see this with the User GET
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // populate the thought fields into the get request
            .populate({
                // set the path to the thoughts
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v') // indicate we don't want to see this with the User GET
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(404).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        // use 'runValidators: true' so that when updating the user it knows to validate any new information
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

// export the userController
module.exports = userController;
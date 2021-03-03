// connect to the express Router
const router = require('express').Router();
// connect to the Thought controllers
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts/
router.route('/')
    .get(getAllThoughts)
    .post(addThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);


module.exports = router;
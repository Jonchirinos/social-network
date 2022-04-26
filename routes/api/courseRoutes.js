const router = require("express").Router();
const { getThoughts, getOneThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require("../../controllers/thoughtController.js");

// GET & POST routes for 'thought'
router.route("/").get(getThoughts).post(createThought);

// POST/PUT/DELETE using '("/:thoughtID")
router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);

//POST a reaction to a thought
router.route("/:thoughtID/reactions").post(createReaction);

// DELETE a reaction using the reactionID
router.route("/:thoughtID/reactions/:reactionId").delete(deleteReaction);

module.exports = router;

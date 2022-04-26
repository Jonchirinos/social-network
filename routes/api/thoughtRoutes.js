const router = require("express").Router();
const { getThoughts, getOneThoughts, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require("../../controllers/thoughtController.js");

// GET and POST thoughts
router.route("/").get(getThoughts).post(createThought);

// POST, PUT, DELETE by thoughtId
router.route("/:thoughtId").get(getOneThoughts).post(createThought).put(updateThought).delete(deleteThought);

// POST thoughts by thoughtId
router.route("/:thoughtId/reactions").post(createReaction);

// DELETE reaction by reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;

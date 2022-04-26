const { Thought, User } = require("../models");
// controllers for routes
const controllers = {
    // GET all Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughtData) => {
                res.json(thoughtData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    // GET a single Thought
    getOneThoughts(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }).then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thought).catch((err) => res.status(500).json(err))));
    },
    // POST for creating a Thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true });
            })
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // PUT to update a Thought using _id
    updateThought(req, res) {
        thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true }).then((newThought) => (!newThought ? res.status(404).json({ message: "No thought with this ID" }) : res.json(newThought).catch((err) => res.status(500).json(err))));
    },
    // DELETE to delete a Thought using _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID." }) : User.deleteMany({ _id: { $in: thought.user } })))
            .then(() => res.json({ message: "Thought deleted" }))
            .catch((err) => res.status(500).json(err));
    },
    // POST to create a Reaction which is stored in our Thought model
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true })
            .then((reaction) => (!reaction ? res.status(404).json({ message: "Reaction added." }) : res.json(reaction)))
            .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a Reaction using the _id stored in the Thought model
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true })
            .then((reaction) => (!reaction ? res.status(404).json({ message: "No reaction found with that id." }) : res.json(reaction)))
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = controllers;

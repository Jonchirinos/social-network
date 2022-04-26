const { User } = require("../models");

const controllers = {
    // GET all users
    getUsers(req, res) {
        User.find()
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    // POST to create user
    createUser(req, res) {
        User.create(req.body)
            .then((userInfo) => res.json(userInfo))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    // GET user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((userFound) => {
                !userFound
                    ? res.status(404).json({ message: "No user found with that ID" })
                    : res.json({
                          userFound,
                      });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    // PUT to update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({
                          message: "No user found with this ID",
                      })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE user by id
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => !user, res.status(404).json({ message: "No user found with that ID" }))
            .then(() => res.status({ message: "User removed." }))
            .catch((err) => res.status(500).json(err));
    },
    // BONUS: POST to add to friend list
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true })
            .then((user) => (!user ? res.status(404).json({ message: "Friend added to your friend's list" }) : res.json(user)))
            .catch((err) => res.status(500).json(err));
    },
    // BONUS: DELETE to remove friend from friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true })
            .then((friend) => (!friend ? res.status(404).json({ message: "No friend found with that ID" }) : res.json(friend)))
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = controllers;

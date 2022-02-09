const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .populate('Thought')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    }
}
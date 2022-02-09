const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .populate('reactions')
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    postThought(req, res) {
        Thought.create(req.body)
        .select('-__v')
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                )
                    .then((user) => !user ? res.status(404).json({ message: 'Thought created, but no user with that ID found' }) : res.status(201).json({ message: 'Thought added successfully' }))
            })
            .catch((err) => res.status(500).json(err));
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions')
            .select('-__v')
            .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .select('-__v')
            .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json({ message: 'Successfully deleted thought' }))
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .select('-__v')
        .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .select('-__v')
        .then((thought) => !thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    }
}
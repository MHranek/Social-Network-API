const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    postThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getThoughtById(req, res) {
        
    },
    updateThought(req, res) {
        
    },
    deleteThought(req, res) {
        
    },
    addReaction(req, res) {
        
    },
    deleteReaction(req, res) {
        
    }
}
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        // TODO type of objectId, default value is a new objectId
    },
    reactionBody: {
        type: String,
        required: true,
        // TODO 280 character maximum
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        // TODO Date, default value to current timestamp, use a getter method to format the timestamp on query
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        // TODO must be between 1 and 280 characters
    },
    createdAt: {
        // TODO Date, default value to current timestamp, use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            // TODO documents created with the reactionSchema
        }
    ]
});

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
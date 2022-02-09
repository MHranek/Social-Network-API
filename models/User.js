const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // TODO Valid Email adress
    },
    thoughts: [
        {
            // TODO Thought model reference
        }
    ],
    friends: [
        {
            // TODO User model reference
        }
    ]
});

userSchema.virtual('friendCount')
.get(function() {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
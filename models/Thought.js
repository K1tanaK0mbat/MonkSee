const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp), 
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        type: [reactionSchema],
    },
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length; 
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought; 


function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

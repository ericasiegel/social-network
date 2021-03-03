// connect to the mongoose package
const { truncate } = require('fs');
const { Schema, model, Types } = require('mongoose');

// import the date formatting in utils folder
const dateFormat = require('../utils/dateFormat');

// Schema for Reactions
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: truncate
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use the getter to format the date
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON:{
            getters: true
        }
    }
);

// Schema for Thoughts
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max: 280,
            min: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use the getter to activate the formatted date
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        // tell the schema to use virtuals using toJSON property
        toJSON: {
            // use virtuals
            virtuals: true,
            getters: true
        },
        id: false // set to "false" because this is a virtual that Mongoose returns, and we don't need it
    }
);

// add virtual for ThoughtSchema to get the total reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the model
module.exports = Thought;
// import mongoose dependancies
const { Schema, model } = require('mongoose');

// import the date formatting in utils folder
const dateFormat = require('../utils/dateFormat');

// User Schema
const UserSchema = new Schema(
    {
        username: {
            type: String, // data type
            unique: true, // make sure there are no duplicate usernames
            required: 'Please provide a username!', // validation to tell the user to provide a username in case it is left blank
            trim: true // trim any empty space before or after the entry
        },
        email: {
            type: String, // data type
            unique: true, // make sure there are no duplicate emails
            required: 'Please provide your email!', // validation to tell the user to provide their email in case it is left blank
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] // check if the email is in valid form using regex
        },
        // add the child 'thoughts' array to the parent 'user'
        thoughts: [
            {
                // tell Mongoose to expect an ObjectId and to tell it that its data comes from the Thought model
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // add the child 'friends' array to the parent 'user'
        friends: [
            {
                // tell Mongoose to expect an ObjectId and to tell it that its data comes from the User model
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
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

// virtual set to get the total count of User's friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
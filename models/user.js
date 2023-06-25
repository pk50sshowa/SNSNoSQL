const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'Username is required",
        },

        email: {
            type: String,
            unique: true,
            required: 'Email is required',
            match: [/.+\@.+\..+/],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const user = model('user', UserSchema);

module.exports = user;
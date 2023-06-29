const { user, thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        user.find({})
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getUserById({ params }, res) {
        user.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .populate({
                path: 'friends',
                select: '-__v',
            })
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({ body }, res) {
        user.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },

    updateUser({ params, body }, res) {
        user.findOneAndUpdate({ _id: params.id }), body, {
            new: true,
            runValidators: true,
        }
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    deleteUser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }

                return thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and associated thoughts deleted' });
            })
            .catch((err) => res.json(err));
    },

    addFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    deleteFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = userController;
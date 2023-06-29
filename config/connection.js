const mongoose = require('mongoose');

// Connect to a social network database using mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network",
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     }
);

mongoose.set('debug', true);

module.exports = mongoose.connection;
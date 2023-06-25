const mongoose = require('mongoose');

// Connect to social network database using mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     }
);

mongoose.set('debug', true);

module.exports = mongoose.connection;
const userConnection = require("mongoose");

userConnection.connect("mongodb://localhost/passport");

userConnection.Promise = Promise;

module.exports = userConnection;

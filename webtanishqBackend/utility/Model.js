const mongoose = require("mongoose");
const { IPschema, MessageSchema, Amessage, User } = require("./Schema");

const IpModel = mongoose.model(
    "Ipdata",
    IPschema
)

const MessagesModel = mongoose.model(
    "Messages",
    MessageSchema
)

const UserModel = mongoose.model(
    "User",
    User
)

const AmessageMod = mongoose.model(
    "Amessage",
    Amessage
)

module.exports = {
    IpModel,
    MessagesModel,
    AmessageMod,
    UserModel
}
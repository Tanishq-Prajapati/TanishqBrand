const mongoose = require("mongoose")

const IPschema = mongoose.Schema({
    ip: String,
    totalTimeSpan: Number,
    datesEntered: [
        {
            date:String,
            timeSpent:Number
        }
    ]
})

const MessageSchema = mongoose.Schema({
    ip: String
})

const Amessage = mongoose.Schema(
    {
        ip: String,
        byCompany: Boolean,
        time: String,
        content: String,
        isViewedByReciever: Boolean
    }
)

const User = mongoose.Schema(
    {
        isAdmin: Boolean,
        email: String,
        password: String,
        sessionToken: String
    }
)

module.exports = {
    IPschema,
    MessageSchema,
    Amessage,
    User
}
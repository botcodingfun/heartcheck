const mongo = require("mongoose")

const d = new mongo.Schema({
    userid: { type: String },
    date: { type: String },
})
const MessageModel = module.exports = mongo.model("하트", d);
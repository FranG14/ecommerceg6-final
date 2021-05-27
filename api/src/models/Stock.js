const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema({
    _id: Schema.Types.ObjectId,
    colorName: { type: String },
    sizeName: { type: String },
    stock: { type: Number },
});


module.exports = mongoose.model("Stock", stockSchema);
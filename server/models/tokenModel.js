import mongoose from "mongoose";
const TokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    }
})
const Token = mongoose.models.Token || mongoose.model('Token', TokenSchema)
export default Token;
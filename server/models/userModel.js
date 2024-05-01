import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true 
})
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // If password is not modified, move to the next middleware
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});
const User = mongoose.models.User || mongoose.model('User',UserSchema)
export default User;
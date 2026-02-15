const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: 
    { 
        type: String, 
        required: [true, "Name është i detyrueshëm"] 
    },
    email: 
    { 
        type: String,
        required: [true, "Email është i detyrueshëm"], 
        unique: true },
    password: 
    { 
        type: String, 
        required: [true, "Password është i detyrueshëm"], 
        select: false 
    },
    role: 
    { 
        type: String, 
        enum: ["student", "instructor", "admin"], 
        default: "student" 
    }
}, { timestamps: true });

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return; 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema, "users");

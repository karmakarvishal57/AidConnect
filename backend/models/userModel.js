const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default:"data:image/png;base64,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"
    },
    address: {
        type: Object,
        default:{line1:'',line2:''},
    },
    gender: {
        type: String,
        default: "Not Selected"
    },
    dob: {
        type: String,
        default: "Not Selected"
    },
    phone: {
        type: String,
        default: "000000000000"
    }
}, {
    minimize: false
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema)

module.exports = userModel;
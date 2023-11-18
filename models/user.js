const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    test : {
        type : String,
        maxLength: 50,
        required : true
    },
    value : {
        type : Number,
        required : true
    },
    min : {
        type : Number,
    },
    max : {
        type : Number,
    },
    remark : {
        type : String,
        maxLength: 100,
    },
    created_at : {
        type : Date,
        required : true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

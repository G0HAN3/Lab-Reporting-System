const mongoose = require("mongoose");
const User = require("./models/user");

main()
.then (()    => console.log("connection successful"))
.catch((err) => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/labs');
};

let allUsers = [
    {
        name: "Rohit",
        age: 37,
        test: "Sonography",
        value: 100,
        min: 80,
        max: 120,
        remark: "Perfect condition.",
        created_at: new Date()
    },
    {
        name: "Virat",
        age: 35,
        test: "Sonography",
        value: 110,
        min: 80,
        max: 120,
        remark: "In control, need to manage diet.",
        created_at: new Date()
    }
]

User.insertMany(allUsers);


// chat1.save().then((res) => console.log(res));


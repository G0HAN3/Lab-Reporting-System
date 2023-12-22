const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// to tell from where css and js files will be provided to ejs
app.use(express.static(path.join(__dirname, "public")));
// to parse data coming from ejs
app.use(express.urlencoded({extended: true}));
// method override to use PUT Method in Forms in ejs
app.use(methodOverride("_method"));

// Setting up the connection with mongoDB
main()
.then (()    => console.log("connection successful"))
.catch((err) => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/labs');
};


// HOME ROUTE
app.get("/", (req,res) => {
    res.render("home.ejs");
});

// DOC LOGIN ROUTE
app.get("/home/doc", (req,res) => {
    res.render("doc.ejs");
});

// PATIENT LOGIN ROUTE
app.get("/home/user", (req,res) => {
    res.render("user.ejs");
});





// DOC DASHBOARD
app.get("/home/doc/dashboard", async (req,res) => {
    let users = await User.find();
    // console.log(user);
    res.render("docDash.ejs", {users});
});


// NEW ROUTE
app.get("/home/doc/dashboard/new", (req, res) => {
    res.render("new.ejs");
    // res.send("working");
});

// CREATE ROUTE
app.post("/home/doc/dashboard", (req, res) => {
    let { name, age, test, value, min, max, remark } = req.body;

    let newUser = new User ({
        name: name,
        age: age,
        test: test,
        value: value,
        min: min,
        max: max,
        remark: remark,
        created_at: new Date()
    })

    newUser.save()
    .then(res => {console.log("report saved")})
    .catch(err => {console.log(err)});
    res.redirect("/home/doc/dashboard");
});


// DOC DASHBOARD PATIENT DETAILS
// name is passed as id
app.get("/home/doc/dashboard/:id", async (req,res) => {
    let {id} = req.params;
    // let user = await User.findById(id);
    const user = await User.findOne({ name: id });
    // console.log(user);
    res.render("docUserDetails.ejs" , {user});

   
});

// DESTROY ROUTE
// object id is pssed as id
app.delete("/home/doc/dashboard/:id", async (req,res) => {
    let {id} = req.params;
    let deletedUser = await User.findByIdAndDelete(id);
    console.log(deletedUser);
    res.redirect("/home/doc/dashboard");
});

// EDIT ROUTE
app.get("/home/doc/dashboard/:id/edit", async (req, res) =>{
    let {id} = req.params;
    let user = await User.findById(id);
    res.render("edit.ejs", {user});
});

// UPDATE ROUTE
app.put("/home/doc/dashboard/:id", async (req, res) => {
    let {id} = req.params;
    let {value : newValue, remark : newRemark} = req.body;
    let updatedUser = await User.findByIdAndUpdate(id, 
        {value : newValue, remark : newRemark},
        {runValidators: true, new: true}
        )
        console.log(updatedUser);
        res.redirect("/home/doc/dashboard");
});






// PATIENT DASHBOARD
app.get("/home/user/dashboard", async (req,res) => {
    let users = await User.find();
    res.render("userDash.ejs", {users});
});


// User DASHBOARD PATIENT DETAILS
// name is passed as id
app.get("/home/user/dashboard/:id", async (req,res) => {
    let {id} = req.params;
    // let user = await User.findById(id);
    const user = await User.findOne({ name: id });
    // console.log(user);
    res.render("userDetails.ejs" , {user});

   
});



app.get("/", (req,res) => {
    res.send("working out");
});

app.listen(8080, () => {
    console.log("app is listening");
});


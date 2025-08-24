const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require('bcrypt');
const cookies = require("cookie-parser");


const { validateSignUpData } = require("./utils/validation");

app.use(express.json());
app.use(cookies());


app.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const password = req.body.password;

        // Hash the password before saving it to the database
        const hashPassword = await bcrypt.hash(password, 10);

        console.log(req.body);
        //creating a new instance of User model
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: hashPassword, // Store the hashed password
        });

        await user.save();
        res.send("User registered successfully");
    } catch (err) {

        res.status(400).send("Error registering user: " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Email id");
        }
        const isPassword = await bcrypt.compare(password, user.password);

        if (isPassword) {
            res.send("Login Successfull");
        } else {
            throw new Error("Password not correct");
        }
    } catch (err) {
        res.status(400).send("Eror:" + err.message);
    }
})

app.get("/profile", async (req, res) => {
   const cookie = req.cookies;

   const {tooken} = cookie;
   
   console.log("Cookies:", cookie);
   res.send("Profile Page");
})

// get all users from the database
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(400).send("Internal Server Error");
    }
});

// get a user by emailId
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        console.log("Fetching user with email:", userEmail);
        const user = await User.findOne({ emailId: userEmail });
        res.send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(400).send("Internal Server Error");
    }
});

//delete a user by id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        console.log("Deleting user with ID:", userId);
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(400).send("Internal Server Error");
    }
});

//update data of a user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log("Update Data:", data);
    try {
        console.log("Updating user with ID:", userId);
        const user = await User.findByIdAndUpdate({ _id: userId }, data);
        res.send("user updated successfully");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(400).send("Internal Server Error");
    }
});



connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
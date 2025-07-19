const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");


app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "John Doe",
        lastName: "Doe",
        emailId: "john.doe@example.com",
        password: "password123",
    });


    await user.save();
    res.send("User registered successfully");

});

connectDB().then(() => {
    console.log('Connected to MongoDB');
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
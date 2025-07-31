const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);
    //creating a new instance of User model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(400).send("Internal Server Error");
    }
});


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
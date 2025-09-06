
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try{
      // read the token from the request cookies
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
        throw new Error("No token valid");
    }

    const decodedMessage = await jwt.verify(token, "Dev@Tinder$790");
    const { id } = decodedMessage;

    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    req.user = user;
    next();
  }
  catch(err){
    res.status(401).send("Unauthorized: " + err.message);
  }
}
module.exports = userAuth;
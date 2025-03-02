const UserModel = require("../models/GoogleUserModel");
const { oauth2client } = require("../utils/googleConfig");
const axios = require('axios');
const jwt = require('jsonwebtoken');

const googleLogin =  async (req,res)=>{
    try {
/*         console.log("Received code:", req.query.code);
 */        const {code} = req.query;

        const googleRes = await oauth2client.getToken(code);
/*         console.log("Google OAuth Tokens:", googleRes.tokens);
 */        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
/*         console.log("User Info Response:", userRes.data);
 */        const { email, name, picture } = userRes.data;

        let user = await UserModel.findOne({ email });
        if (!user) {
/*             console.log("User not found, creating new user...");
 */            user = await UserModel.create({ name, email, image: picture });
        }
/*         console.log("User Data:", user);
 */
        const { _id } = user;
/*         console.log("Generating JWT token...");
 */        const token = jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIMEOUT }
        );
/*         console.log("JWT Token Generated:", token);
 */
        return res.status(200).json({
            message: 'Success',
            token,
            user
        });
    } catch (err) {
        console.error("Google Login Error:", err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

module.exports = {googleLogin};
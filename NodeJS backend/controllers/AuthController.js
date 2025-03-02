const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userModel = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


const signup = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        const findUser = await userModel.findOne({email});
        if (findUser){
            return res.status(409).json({
                message: "User is already exist,you can login", success: false
            });
        }
        const UserModel = new userModel({name,email,password});
        UserModel.password = await bcrypt.hash(password,10);
        await UserModel.save();
        res.status(201).json({
            message: 'Signup successfully',
            success: 'true',
            name,
            email
        });
    }
    catch(err){
        res.status(500).json({
            message: 'Internal Server error',
            success: 'false',
        });
    }
}

const login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const findUser = await userModel.findOne({email});
        const errorMsg = "Auth failed email or password is wrong";
        if (!findUser){
            return res.status(403).json({
                message: errorMsg, success: false
            });
        }
        const isPasswordEqual = await bcrypt.compare(password,findUser.password);
        if(!isPasswordEqual){
            return res.status(403).json({
                message: errorMsg, success: false
            }); 
        }

        const jwt_token = jwt.sign({email: findUser.email, _id: findUser._id},process.env.JWT_SECRET,{expiresIn: '24h'});
        res.status(200).json({
            message: 'Login success',
            success: 'true',
            jwt_token,
            email,
            name: findUser.name,
            
        });
    }
    catch(err){
        res.status(500).json({
            message: 'Internal Server error',
            success: 'false',
        });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

   
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; 

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        const mailOptions = {
            from: `"PrepX Support" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "PrepX Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333;">Hello ${user.name},</h2>
                        <p style="color: #555; font-size: 16px;">
                            You recently requested to reset your password for your <b>PrepX</b> account. Click the button below to reset it:
                        </p>
                        <div style="text-align: center;">
                            <a href="${resetLink}" 
                                style="display: inline-block; padding: 12px 20px; font-size: 16px; color: white; background-color: #007bff; 
                                text-decoration: none; border-radius: 5px; margin-top: 20px;">
                                Reset Your Password
                            </a>
                        </div>
                        <p style="color: #555; font-size: 14px; margin-top: 20px;">
                            If you did not request a password reset, please ignore this email or contact our support at <b>support@prepx.com</b>.
                        </p>
                        <p style="color: #777; font-size: 12px; margin-top: 20px;">
                            Thanks, <br> <b>The PrepX Team</b>
                        </p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, 
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null; 
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: "Password reset successful. You can now login." });
    } catch (error) {
        console.error("Error in reset password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {signup,login,forgotPassword, resetPassword}
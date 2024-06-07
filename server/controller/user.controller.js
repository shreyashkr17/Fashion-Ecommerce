const bcrypt = require('bcrypt');
const User = require("../model/user.model");
const jwt = require('jsonwebtoken');
const {v4:uuidv4} = require('uuid');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const validator = require("../utils/validator");

dotenv.config();

class UserController{
    static async register(req, res){
        const {email, password, firstName, lastName} = req.body;
        try {
            const existingUser = await User.findOne({
                where:{
                    userEmail:email
                }
            });

            if(existingUser){
                return res.status(400).json({
                    message:"User already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(`${password}${email}`, 10);
            const userId = uuidv4();
            const body = {userEmail:email, hashedPassword:hashedPassword, userId:userId}

            if(firstName){
                body.firstName = firstName;
            }
            if(lastName){
                body.lastName = lastName;
            }
            const newUser = await User.create(body);

            const token = jwt.sign({ userId:newUser.userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'iretiensemble@gmail.com',
                    pass: process.env.APP_PASSWORD
                }
            });

            let meilOptions = {
                from:'iretiensemble@gmail.com',
                to:email,
                subject: `Registration Successful`,
                text: `Dear User,\n\n Thank you for registering with Ireti Ensemble, the premier online destination for fashion lovers! We are excited to have you join our vibrant community.
                
                To get started, simply log in to our website at www.iretiensemble.com/pages/login using your email and the password you created during registration. Once logged in, you can start exploring our latest clothing collections, reading style blogs, watching video tutorials, and connecting with other fashionistas.
                
                As a Ireti Ensemble member, you'll have access to exclusive deals, early alerts about new arrivals, and special invitations to our events and fashion shows.
                
                We're dedicated to making FashionBuzz the ultimate fashion hub. If you have any questions, suggestions, or feedback, please don't hesitate to reach out to our friendly support team at iretiensemble@gmail.com.
                
                Get ready to dive into the world of fashion and make your style dreams a reality!`
            };

            let info = await transporter.sendMail(meilOptions);
            
            res.cookie('token',token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            const responseData = {
                user:newUser,
                token:token
            }
            return res.status(201).json({responseData});
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async login(req,res){
        const {input, password} = req.body;
        try {
            let user,email;
            if(validator.checkInput(input) === 'Email'){
                email = input;
                user = await User.findOne({
                    where:{
                        userEmail:input
                    }
                });
            }else if(validator.checkInput(input) === 'Username'){
                user = await User.findOne({
                    where: {
                        username: input
                    }
                });
            }else{
                return res.status(400).json({
                    message:"Invalid input"
                })
            }

            if(!user){
                return res.status(400).json({
                    message:"Invalid email/username or password"
                })
            }

            const isPasswordValid = await bcrypt.compare(`${password}${user.userEmail}`, user.hashedPassword);

            if(!isPasswordValid){
                return res.status(401).json({message:"Invalid email/username or password"});
            }
            console.log(user.userId);

            const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.cookie('token', token,user, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            const responseData = {user, token:token}
            // let users = {user.firstName, user.lastName, user.userEmail, user.phoneNo, user.shippingAddress, user.billingAddress}

            return res.status(200).json({ message: "Login successful", responseData });

        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getLoginRedirectGoogle(req,res){
        try {
            let user = req.body;
            console.log(user);
            const userEmail = user.email;
            const firstName = user.name.split(' ')[0];
            const lastName = user.name.split(' ')[1];
            console.log(userEmail,firstName,lastName);

            const existingUser = await User.findOne({
                where:{
                    userEmail:userEmail
                }
            });
            

            if(existingUser){
                user = existingUser;
                const existingPassword = existingUser.hashedPassword;
                const isPasswordValid = await bcrypt.compare(`${userEmail}${firstName}${lastName}`,existingPassword);

                if(!isPasswordValid){
                    return res.status(401).json({message:"Invalid email/username or password"});
                }

                const token = jwt.sign({userdId:existingUser.userId}, process.env.JWT_SECRET, {expiresIn:'30d'});

                res.cookie('token', token,existingUser, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                const responseData = {user, token:token}
                return res.status(200).json({ message: "Login successful", responseData });
            }

            const hashedPassword = await bcrypt.hash(`${userEmail}${firstName}${lastName}`,10);

            const userId = uuidv4();

            const body = {userEmail:userEmail, firstName:firstName, lastName:lastName, hashedPassword:hashedPassword, userId:userId}

            const newUser = await User.create(body);

            const token = jwt.sign({userId:newUser.userId}, process.env.JWT_SECRET, {expiresIn:'30d'});
            console.log(token)

            res.cookie('token', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            const responseData = {user:newUser, token:token}

            return res.status(201).json({responseData})
            // return res.status(200).json({userEmail,firstName,lastName});
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAccountByEmail(req,res){
        try {
            const {emailId} = req.body;

            const user = await User.findOne({
                where:{
                    userEmail:emailId
                }
            });

            if(!user){
                return res.status(404).json({message:"User not found"});
            }

            return res.status(200).json({user});
        } catch (error) {
            console.error('Error retrieving user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('token');
            return res.status(200).json({message:"Logout Succesfull"});
        } catch (error) {
            console.error('Error logging out:', error);
            return res.status(500).json({message:"Internal Server error"});
        }
    }

    static async editAccountDetail(req,res){
        try {
            const {firstName, lastName,phoneNo, currentPassword, newPassword, confirmPassword, userCity} = req.body;
            console.log("Requested userID",req.user.userId)
            const userId = req.user.userId;
            const user = await User.findByPk(userId);

            if(!user){
                return res.status(404).json({message:"User not found"});
            }

            if(firstName){
                user.firstName = firstName;
            }
            if(lastName){
                user.lastName = lastName;
            }
            if(phoneNo){
                user.phoneNo = phoneNo;
            }

            if(userCity){
                user.userCity = userCity;
            }

            if(currentPassword){
                const isPasswordValid = await bcrypt.compare(currentPassword, user.hashedPassword);
                if(!isPasswordValid){
                    return res.status(401).json({message:"Invalid current Password"})
                }
            }

            if(newPassword){
                if(newPassword !== confirmPassword){
                    return res.status(400).json({message:"New Password and confirm password do not match"});
                }
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.hashedPassword = hashedPassword;
            }

            await user.save();
            // console.log(user);

            return res.status(200).json({
                message:"User details updated successfully",
                user
            });
        } catch (error) {
            console.error('Error updating user details:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getUser(req,res){
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization token is missing or invalid' });
            }
            
            const token = authHeader.split(' ')[1];
            // console.log(token);

            if(!token){
                return res.status(401).json({ message: 'Authorization token is missing' });
            }
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            const userId = decode.userId;
            const user = await User.findByPk(userId);
            
            if(!user){
                return res.status(404).json({
                    message:"User not found"
                })
            }
            const responseData = {
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userEmail: user.userEmail,
                    phoneNo: user.phoneNo,
                    userSpentAmount: user.userSpentAmount,
                    couponUsed: user.couponUsed,
                    userCity: user.userCity,
                },
            }

            return res.status(200).json({responseData})
        } catch (error) {
            console.error('Error retrieving user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    

    static async updateShippingAddress(req,res){
        try {
            const userId= req.user.userId;
            const {shippingAddress} = req.body;

            const user = await User.findByPk(userId);

            if(!user){
                return res.status(404).json({
                    message:"User not found"
                });
            }

            if(shippingAddress){
                user.shippingAddress = shippingAddress;
            }

            await user.save();

            return res.status(200).json({
                message:"Address updated successfully"
            })
        } catch (error) {
            console.error('Error updating addresses:', error);
            return res.status(500).json({message:"Internal server error"});
        }
    }

    static async updateBillingAddress(req,res){
        try {
            const userId = req.user.userId;
            const {billingAddress} = req.body;

            const user = await User.findByPk(userId);

            if(!user){
                return res.status(404).json({
                    message:"User not found"
                });
            }

            if(billingAddress){
                user.billingAddress = billingAddress;
            }

            await user.save();

            return res.status(200).json({
                message:"Address updated successfully"
            })
        } catch (error) {
            console.error('Error updating addresses:', error);
            return res.status(500).json({message:"Internal server error"});
        }
    }

    static async getAddress(req,res){
        try {
            const userId = req.user.userId;
            // console.log(userId);
            const user = await User.findByPk(userId);
            // console.log(user);

            if(!user){
                return res.status(404).json({
                    message:"User Not Found"
                })
            }

            const shippingAddress = user.shippingAddress;
            const billingAddress = user.billingAddress;
            // console.log(shippingAddress,billingAddress);

            return res.status(200).json({
                shippingAddress,
                billingAddress
            })
        } catch (error) {
            console.error('Error retrieving shipping address:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async addAddress(req, res){
        try {
            const userId = req.user.userId;
            const { shippingAddress, billingAddress } = req.body;

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let updatedShippingAddresses = user.shippingAddress || [];
            let updatedBillingAddresses = user.billingAddress || [];

            // Concatenate new address with existing addresses
            if (shippingAddress) {
                const { name, address, phoneNo, datetime } = shippingAddress;
                if (name && address && phoneNo && datetime) {
                  updatedShippingAddresses = [...updatedShippingAddresses, shippingAddress];
                } else {
                  return res.status(400).json({ message: "Invalid shipping address data" });
                }
            }

            if (billingAddress) {
                const { name, address, phoneNo, datetime } = billingAddress;
                if (name && address && phoneNo && datetime) {
                  updatedBillingAddresses = [...updatedBillingAddresses, billingAddress];
                } else {
                  return res.status(400).json({ message: "Invalid billing address data" });
                }
            }

            await user.update({
                shippingAddress: updatedShippingAddresses,
                billingAddress: updatedBillingAddresses,
            });

            return res.status(200).json({
                message: "Address added successfully",
                shippingAddress: updatedShippingAddresses,
                billingAddress: updatedBillingAddresses,
            });
        } catch (error) {
            console.error("Error adding address:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getTotalUsers(req,res){
        try {
            const totalUser = await User.count();
            return res.status(200).json({totalUser});
        } catch (error) {
            console.error('Error retrieving total users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getUsersCreatedThisYear(req, res) {
        try {
            const currentYear = new Date().getFullYear();

            const users = await User.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: new Date(currentYear, 0, 1), 
                        [Op.lt]: new Date(currentYear + 1, 0, 1) 
                    }
                }
            });

            const result = users.length;

            return res.status(200).json({ result });
        } catch (error) {
            console.error('Error retrieving users created this year:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;
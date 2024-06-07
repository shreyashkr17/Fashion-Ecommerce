const Contactus = require('../model/contectus.model');
const Subscription = require('../model/subscription.model');
const {v4:uuidv4} = require('uuid');
const ImageKit =  require("imagekit");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config();

class ContactUs{
    static async postQuery(req,res){
        try {
            const {senderName, senderEmail, senderPhone, querySubject, queryMessage} = req.body;

            const queryId = uuidv4();
            

            let transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'iretiensemble@gmail.com',
                    pass: process.env.APP_PASSWORD
                }
            })

            let meilOptions = {
                from:'iretiensemble@gmail.com',
                to:senderEmail,
                subject: `New Query: ${querySubject}`,
                text: `Sender Name: ${senderName}\nSender Email: ${senderEmail}\nSender Phone: ${senderPhone}\nQuery Message: ${queryMessage}`
            };

            let info = await transporter.sendMail(meilOptions);

            console.log("Message sent: %s", info.messageId);

            await Contactus.create({
                queryId,
                senderName,
                senderEmail,
                senderPhone,
                querySubject,
                queryMessage
            });

            res.status(200).json({ message: 'Query sent successfully' });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ error: 'An error occurred while sending the query' });
        }
    }

    static async subscriptionEmail(req,res){
        try{
            const {email} = req.body;

            const existingUser = await Subscription.findOne({
                where:{
                    email
                }
            });

            if(existingUser){
                return res.status(400).json({error:'Email already subscribed'});
            }
            const subId = uuidv4();

            let transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'iretiensemble@gmail.com',
                    pass: process.env.APP_PASSWORD
                }
            });

            let mailOption ={
                from:'iretiensemble@gmail.com',
                to:email,
                subject:'Subscription Confirmation',
                text:'Thank you for subscribing to our newsletter. You will receive updates on our latest products and offers.'
            }

            await Subscription.create({
                subId,
                email
            });
            let info = await transporter.sendMail(mailOption);



            return res.status(200).json({message:'Subscription email sent successfully'})
        }catch(err){
            console.error("Error sending email:", err);
            res.status(500).json({ error: err });
        }
    }

    static async sendEmail(req, res) {
        try {
            var transporter = await nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'iretiensemble@gmail.com',
                    pass: process.env.APP_PASSWORD
                }
            });
    
            var mailOptions = {
                from: 'iretiensemble@gmail.com',
                to: 'kumarshreyash39@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };
    
            let info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        }
    }
}

module.exports = ContactUs;
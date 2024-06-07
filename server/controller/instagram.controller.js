const Instagram = require("../model/instagram.model");
const {v4:uuidv4} = require('uuid');
const ImageKit =  require("imagekit");
const validator = require('../utils/validator');
const {ImageConfig} = require('../config');


const imageKit = new ImageKit({
    publicKey:ImageConfig.imageKitConfig.publicKey,
    privateKey:ImageConfig.imageKitConfig.privateKey,
    urlEndpoint:ImageConfig.imageKitConfig.urlEndpoint,
});

class InstagramController{
    static async postInstagram(req,res){
        try{
            const {postlink, postedBy} = req.body;
            // const {error} = validator.instagramValidator.validate({thumbnailUrl,postlink});
            // if(error){
            //     return res.status(400).json({error:error.message});
            // }

            const instaId = uuidv4();
            const file =req.file;
            const folderName = `instagram/${instaId}`.toLowerCase().replace(/[^a-z0-9_/]/g, '');
            const fileResponse = await imageKit.upload({
                file:file.buffer,
                fileNamw:file.originalname,
                fileName:folderName,
            });
            const instagram = await Instagram.create({
                thumbnailUrl:fileResponse.url,
                postlink,
                postedBy,
            });
            return res.status(201).json({instagram});
        }catch(err){
            console.log(err);
            return res.status(500).json({error:"Internal Server Error"});
        }
    }

    static async getAllInstagram(req,res){
        try{
            const instagram = await Instagram.findAll();
            if(instagram.length === 0){
                return res.status(404).json({error:"No Instagram Post Found"});
            }
            return res.status(200).json({instagram});
        }catch(err){
            console.log(err);
            return res.status(500).json({error:"Internal Server Error"});
        }
    }
}

module.exports = InstagramController;
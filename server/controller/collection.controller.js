const Collection = require('../model/collection.model');
const {v4:uuidv4} = require('uuid');
const ImageKit =  require("imagekit");
require('dotenv').config();
const {ImageConfig} = require('../config');

const imageKit = new ImageKit({
    publicKey:ImageConfig.imageKitConfig.publicKey,
    privateKey:ImageConfig.imageKitConfig.privateKey,
    urlEndpoint:ImageConfig.imageKitConfig.urlEndpoint,
});


class CollectionController{
    static async postCollection(req,res){
        try {
            const {collectionName, collectionSubName, collectionTitle, collectionType, collectionDescription} = req.body;
            const collectionId = uuidv4();

            const folderName = `collection/${collectionId}/`.toLowerCase().replace(/[^a-z0-9_/]/g, '');
            // let src;
            if(collectionType === 'image'){
                const src = await imageKit.upload({
                    file:req.file.buffer,
                    fileName:req.file.originalname,
                    folder:folderName,
                    tags: ["image"],
                })
                const newData = await Collection.create({
                    collectionId:collectionId,
                    collectionName:collectionName,
                    collectionSubName:collectionSubName,
                    collectionTitle:collectionTitle,
                    colectionDescription:collectionDescription,
                    collectionSrcURl:src.url,
                    collectionType:collectionType
                });
    
                res.status(201).json(newData);
                return;
            }else if(collectionType === 'video'){
                const src = await imageKit.upload({
                    file:req.file.buffer,
                    fileName:req.file.originalname,
                    folder:folderName,
                    tags: ["video"],
                });

                const newData = await Collection.create({
                    collectionId:collectionId,
                    collectionName:collectionName,
                    collectionSubName:collectionSubName,
                    collectionTitle:collectionTitle,
                    colectionDescription:collectionDescription,
                    collectionSrcURl:src.url,
                    collectionType:collectionType
                });
    
                res.status(201).json(newData);
                return;
            }

            res.status(400).json({error:'Invalid collection type'});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Internal server error'});
        }
    }

    static async getAllCollections(req, res){
        try {
            const collections = await Collection.findAll();
            res.status(200).json({collections});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Internal server error'});
        }
    }

    static async deleteCollection(req,res){
        try {
            const {collectionId} = req.body;
            const collection = await Collection.findOne({where:{collectionId:collectionId}});

            if(!collection){
                res.status(404).json({error:'Collection not found'});
                return;
            }

            const folderPath = `collection/${collectionId}/`.toLowerCase().replace(/[^a-z0-9_/]/g, '');
            // console.log(folderPath)

            await imageKit.deleteFolder(folderPath);

            await Collection.destroy({where:{collectionId:collectionId}});

            res.status(200).json({message:'Collection deleted successfully'});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Internal server error'});
        }
    }

    static async updateCollection(req,res){
        try {
            const {collectionId, collectionTitle, collectionDescription, collectionSubName } = req.body;
            const collection = await Collection.findOne({where:{collectionId:collectionId}});
            if(!collection){
                res.status(404).json({error:'Collection not found'});
                return;
            }

            collection.collectionTitle = collectionTitle;
            collection.colectionDescription = collectionDescription;
            collection.collectionSubName = collectionSubName;

            await collection.save();

            return res.status(200).json({ message: 'Collection updated successfully', collection });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getCollectionDetail(req,res){
        try {
            const {collectionName, collectionSubName} = req.body;

            if(!collectionName || !collectionSubName){
                res.status(400).json({error:'Collection name and subname required'});
                return;
            }

            const collectionDetail = await Collection.findAll({
                where:{
                    collectionName:collectionName,
                    collectionSubName:collectionSubName
                }
            });

            if (collectionDetail.length === 0) {
                return res.status(404).json({ error: 'No Collection Not Found' });
            }
    
            return res.status(200).json({ collectionDetail });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = CollectionController;
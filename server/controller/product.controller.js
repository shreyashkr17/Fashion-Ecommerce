const Product = require('../model/product.model')
const ProductLgPic = require('../model/productlgpic.model')
const ProductSmPic = require('../model/productsmpic.model')
const ProductVariants = require('../model/variants.product.model')
const ModelSize = require('../model/sizes.model')
const {v4:uuidv4} = require('uuid')
const convertSlug = require('../utils/validator')
const ImageKit = require('imagekit')
const {ImageConfig} = require('../config');
const { INTEGER } = require('sequelize')
const sequelize = require('../sequelize')
const { Op } = require('sequelize');
const User = require('../model/user.model')

const imageKit = new ImageKit({
    publicKey:ImageConfig.imageKitConfig.publicKey,
    privateKey:ImageConfig.imageKitConfig.privateKey,
    urlEndpoint:ImageConfig.imageKitConfig.urlEndpoint,
});

class ProductController{
    static async uploadProduct(req,res){
        try {
            const {productName, productSlug, productshortDesc,productAddInfo,productShippingInfo,relatedProducts, productPrice, productsalePrice, ProductUntill,  productTop, productNew, producEmbroidered, productSold, productCategory,productOccasion,productMaterial, productBrands, userId} = req.body;

            const productId = uuidv4();
            const productAuthor = userId;

            let processedProductAddInfo = [];
            if (productAddInfo) {
                processedProductAddInfo = productAddInfo.split(',').map(detail => {
                    return detail.trim().replace(/^\w/, c => c.toUpperCase());
                });
            }
            const productData = {
                productId,
                productName,
                productSlug,
                productshortDesc,
                productAddInfo:processedProductAddInfo,
                productShippingInfo,
                relatedProducts,
                productPrice,
                productsalePrice,
                ProductUntill,
                productTop: productTop||false,
                productNew: productNew || false,
                producEmbroidered: producEmbroidered || false,
                productAuthor,
                productSold: productSold || false,
                productCategory,
                productOccasion,
                productMaterial,
                productBrands
            }

            const createdProduct = await Product.create(productData);
            // console.log(productData)

            return res.status(201).json({
                success: true,
                message: 'Product uploaded successfully',
                product: createdProduct
            });

        } catch (error) {
            console.error('Error uploading product:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getProductCountProducts(req, res) {
        try {
            const products = await Product.findAll({ raw: true });

            // Initialize an object to store category counts
            const categoryCounts = {};

            // Iterate over each product
            products.forEach(product => {
                // Extract product categories
                const categories = product.productCategory;

                // Iterate over each category of the product
                categories.forEach(category => {
                    // Increment the count if the category exists
                    if (category.name in categoryCounts) {
                        categoryCounts[category.name]++;
                    } else {
                        // Add the category with count 1 if it doesn't exist
                        categoryCounts[category.name] = 1;
                    }
                });
            });

            // Convert categoryCounts object to the desired array format
            const productCounts = Object.keys(categoryCounts).map(category => ({
                productCategory: category,
                count: categoryCounts[category]
            }));

            return res.status(200).json({
                success: true,
                productCounts
            });
        } catch (error) {
            console.error('Error getting product counts by category:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }


    static async getProductOccasionCountProducts(req, res) {
        try {
            const products = await Product.findAll({ raw: true });
            const occasionCounts = {};
            products.forEach(product => {
                const occasions = product.productOccasion;

                
                occasions.forEach(occasion => {
                    
                    if (occasion.name in occasionCounts) {
                        occasionCounts[occasion.name]++;
                    } else {
                        
                        occasionCounts[occasion.name] = 1;
                    }
                });
            });

            const productCounts = Object.keys(occasionCounts).map(category => ({
                occasionCategory: category,
                count: occasionCounts[category]
            }));

            return res.status(200).json({
                success: true,
                productCounts
            });
        } catch (error) {
            console.error('Error getting product counts by category:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }


    static async getProductMaterialCountProducts(req, res) {
        try {
            const products = await Product.findAll({ raw: true });
            const materialCounts = {};
            products.forEach(product => {
                const materials = product.productMaterial;

                
                materials.forEach(material => {
                    
                    if (material.name in materialCounts) {
                        materialCounts[material.name]++;
                    } else {
                        
                        materialCounts[material.name] = 1;
                    }
                });
            });

            const productCounts = Object.keys(materialCounts).map(category => ({
                materialCategory: category,
                count: materialCounts[category]
            }));

            return res.status(200).json({
                success: true,
                productCounts
            });
        } catch (error) {
            console.error('Error getting product counts by category:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async uploadSmPicture(req,res){
        try {
            const {productSlug, width, height} = req.body;
            const productId = await convertSlug.convertSlug(productSlug);
            //productSlug
            // const file = req.file;
            const folderName = `products/${productId}/smpictures`.toLowerCase().replace(/[^a-z0-9_/]/g, '');
            const photoId = uuidv4();
            const uploadedImages = [];

            for(const file of req.files){
                const uploadedImage = await imageKit.upload({
                    file: file.buffer,
                    fileName: file.originalname,
                    folder: folderName
                });
                uploadedImages.push(uploadedImage.url);
            }

            
            const newSmPic = await ProductSmPic.create({
                photoId,
                productId,
                width,
                height,
                photoUrl: uploadedImages
            });
            return res.status(201).json({
                success: true,
                product: newSmPic
            });
        } catch (error) {
            console.error('Error uploading small picture:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getAllProductNames(req,res){
        try {
            const products = await Product.findAll();

            const productDetails = products.map(product => ({
                productName:product.productName,
                productSlug:product.productSlug
            }));

            return res.status(200).json({
                success:true,
                productDetails,
            })
        } catch (error) {
            console.error('Error retrieving product names:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async uploadLgPicture(req,res){
        try {
            const {productSlug,variantSlug, width, height} = req.body;
            const productId = await convertSlug.convertSlug(productSlug);
            const variantId = await convertSlug.convertVariantProductSlug(variantSlug);
            //productSlug
            const file = req.file;
            const folderName = `products/${productId}/variants/${variantSlug}/lgpictures`.toLowerCase().replace(/[^a-z0-9_/]/g, '');
            const prphotoId = uuidv4();

            const uploadedImages = [];

            for(const file of req.files){
                // console.log(file)
                const uploadedImage = await imageKit.upload({
                    file: file.buffer,
                    fileName: file.originalname,
                    folder: folderName
                });
                // console.log("Uploaded Image:", uploadedImage);
                uploadedImages.push(uploadedImage.url);
            }
            console.log(uploadedImages)
            const newLgPic = await ProductLgPic.create({
                prphotoId,
                productId,
                variantId,
                width,
                height,
                photoUrl: uploadedImages
            });
            return res.status(201).json({
                success: true,
                product: newLgPic
            });
        } catch (error) {
            console.error('Error uploading large picture:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    

    static async getSmPicsByProductId(req,res){
        try {
            const { productSlug } = req.body;
            const productId = await convertSlug.convertSlug(productSlug);
            const smPics = await ProductSmPic.findAll({where:{ productId }});
            // console.log(smPics)
            const photoUrls = smPics.map((smPic) => smPic.photoUrl);

            return res.status(200).json({ success: true, photoUrls });
        } catch (error) {
            console.error('Error retrieving small pictures:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' }); 
        }
    }

    static async getRelatedProductDetails(req,res){
        try {
            const { productSlug } = req.body;
            const product = await Product.findOne({ where: { productSlug } });
        
            if (!product) {
              return res.status(404).json({
                success: false,
                message: "Product Not Found",
              });
            }
        
            let relatedProducts = [];
            const relatedProductsString = product.relatedProducts;

            if (Array.isArray(relatedProductsString)) {
                relatedProducts = relatedProductsString;
            }

            const relatedProductSlugs = relatedProducts.map((relatedProduct) => relatedProduct.slug);

            const relatedProductDetails = await Promise.all(
                relatedProductSlugs.map(async (slug) => {
                    const relatedProductData = await Product.findOne({ where: { productSlug: slug } });

                    if(!relatedProductData){
                        return null;
                    }

                    const variants = await ProductVariants.findAll({
                        where:{productId: relatedProductData.productId}
                    });

                    const smPics = await ProductSmPic.findAll({ where: { productId: relatedProductData.productId } });

                    return {
                        productId: relatedProductData.productId,
                        productName: relatedProductData.productName,
                        productSlug: relatedProductData.productSlug,
                        productshortDesc: relatedProductData.productshortDesc,
                        productAddInfo: relatedProductData.productAddInfo,
                        productShippingInfo: relatedProductData.productShippingInfo,
                        relatedProducts: relatedProductData.relatedProducts,
                        productPrice: relatedProductData.productPrice,
                        productsalePrice: relatedProductData.productsalePrice,
                        productReview: relatedProductData.productReview,
                        productUntill: relatedProductData.productUntill,
                        productStock: relatedProductData.productStock,
                        productTop: relatedProductData.productTop,
                        productNew: relatedProductData.productNew,
                        producEmbroidered: relatedProductData.producEmbroidered,
                        productAuthor: relatedProductData.productAuthor,
                        productSold: relatedProductData.productSold,
                        productCategory: relatedProductData.productCategory,
                        productBrands: relatedProductData.productBrands,
                        productAmountEarned: relatedProductData.productAmountEarned,
                        createdAt: relatedProductData.createdAt,
                        updatedAt: relatedProductData.updatedAt,
                        variants, 
                        smPics, 
                    };
                })
            );
        
            return res.status(200).json({
              success: true,
              relatedProducts: relatedProductDetails,
            });
        } catch (error) {
            console.error("Error retrieving related products:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    static async getSmPics(req,res){
        try {
            const {productId} = req.body;
            const smPics = await ProductSmPic.findAll({where:{ productId }});

            if(!smPics){
                return res.status(404).json({
                    success:false,
                    message:"Small Picture Not found for this product Id"
                });
            }
            
            const photoUrls = smPics.map((smPic) => smPic.photoUrl);

            return res.status(200).json({ success: true, photoUrls });
        } catch (error) {
            return res.status(500).json({sucess:false, message:`Internal Server error, ${error}`})
        }
    }

    
    static async getLgPicsByProductId(req,res){
        try {
            const { variantSlug } = req.body;
            const variantId = await convertSlug.convertVariantProductSlug(variantSlug);
            const lgPics = await ProductLgPic.findAll({ variantId });
            const photoUrls = lgPics.map((lgPic) => lgPic.photoUrl);

            return res.status(200).json({ success: true, photoUrls });
        } catch (error) {
            console.error('Error retrieving Large pictures:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' }); 
        }
    }

    static async addVariantsByProduct(req,res){
        try {
            const {productSlug, color, color_name, price, size} = req.body;

            const convertedSlug = await convertSlug.convertSlug(productSlug);
            const variantSlug = `${productSlug}-${color}-${color_name}`.toLowerCase().replace(/[^a-z0-9_]/g, '');
            if(!convertedSlug){
                return res.status(404).json({
                    success:false,
                    message:"Product Not Found"
                })
            }
            const productId = convertedSlug;
            const variantId = uuidv4();
            // console.log(variantId, productId)
            const product = await Product.findOne({
                where:{
                    productId
                }
            });

            const variantData = {
                variantId,
                productId,
                color,
                color_name,
                price,
                size,
                variantSlug,
            };

            const newVariant = await ProductVariants.create(variantData);

            let totalSizeStock = 0;

            for(const sizeObj of size){
                const {name:sizeName, slug:sizeSlug, quantity:sizeStock} = sizeObj;
                // console.log("Size Stock:", sizeStock);
                const sizeId = uuidv4();
                totalSizeStock += sizeStock;

                const sizeData = {
                    sizeId,
                    variantId,
                    productId,
                    sizeName,
                    sizeSlug,
                    sizeStock
                }

                await ModelSize.create(sizeData);
            }

            const updatedVariantStocks = newVariant.variantStocks+totalSizeStock; 
            // console.log(product)
            const currentProductStock = product.productStock;
            // console.log(Number(product.productStock))
            const updateProductStock = currentProductStock + totalSizeStock;
            console.log("Total Current Product Stock: ",currentProductStock)
            console.log("Total Product Stock: ",updateProductStock)

            await ProductVariants.update({
                variantStocks:updatedVariantStocks
            }, {
                where:{
                    variantSlug
                }
            });

            await Product.update({
                productStock:updateProductStock
            }, {
                where:{
                    productId
                }
            });

            res.status(201).json({
                success:true,
                newVariant
            })
        } catch (error) {
            console.error('Error retrieving Product Variants:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getVariantsByProducts(req,res){
        try {
            const {productSlug} = req.body;
            const productId = await convertSlug.convertSlug(productSlug);
            
            if(!productId){
                return res.status(404).json({
                    success:false,
                    message:"Product Not Found"
                })
            }

            const variants = await ProductVariants.findAll({where:{productId}});

            res.status(200).json({
                success:true,
                variants
            });
        } catch (error) {
            console.error('Error retrieving product variants:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getSizesByProduct(req,res){
        try {
            const {variantSlug} = req.body;
            const variantId = await convertSlug.convertVariantProductSlug(variantSlug);

            if(!variantId){
                return res.status(404).json({
                    success:false,
                    message:"Product Not Found"
                })
            };

            const variants = await ProductVariants.findAll({variantId});
            const sizes = [...new Set(variants.map(variant=>variant.size))];

            res.status(200).json({
                success:true,
                sizes
            })
        } catch (error) {
            console.error('Error retrieving product variants sizes:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getAllPRoduct(req, res){
        try {
            const products = await Product.findAll();

            if(!products){
                return res.status(404).json({
                    success:false,
                    message:"Product Not Found"
                });
            }

            return res.status(200).json({
                success:true,
                products
            });
        } catch (error) {
            console.error('Error retrieving products:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getAllProductsVaraintLgPicsSmPics(req,res){
        try {
            const products = await Product.findAll();
            const fetchedData = [];
            await Promise.all(products.map(async (product) => {
                const variants = await ProductVariants.findAll({ where: { productId: product.productId } });
                const smPics = await ProductSmPic.findAll({ where: { productId: product.productId } });
                const variantsData = await Promise.all(variants.map(async (variant) => {
                    const lgPics = await ProductLgPic.findAll({ where: { productId: product.productId, variantId: variant.variantId } });
                    return { variants: variant, lgPics: lgPics };
                }));
                fetchedData.push({
                    products: product,
                    variantsData: variantsData,
                    smPics: smPics
                });
            }));

            return res.status(200).json({
                success:true,
                fetchedData
            })
        } catch (error) {
            console.error('Error retrieving products:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getSingleProductDetail(req,res){
        try {
            const {productSlug} = req.body;
            const product = await Product.findOne({
                where:{productSlug}
            });

            if(!product){
                return res.status(404).json({
                    success:false,
                    message:'Product Not Found'
                });
            }

            const productId = product.productId;

            const smPics = await ProductSmPic.findAll({where: { productId }} );
            const lgPics = await ProductLgPic.findAll({ where: { productId } });
            const variants = await ProductVariants.findAll({ where: { productId } });

            const productDetails = {
                ...product.toJSON(),
                smPics,
                lgPics,
                variants
            };

            return res.status(200).json({
                success:true,
                product:productDetails
            })
        } catch (error) {
            console.error('Error retrieving product:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async deleteProductBySlug(req,res){
        try {
            const {productSlug} = req.body;
            const productId = await convertSlug.convertSlug(productSlug);
            const product = await Product.findOne({
                where: { productSlug }
            });
            // console.log('ProductId', productId);
            // console.log('Product', product)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product Not Found'
                });
            }
            const folderName = `products/${productId}`.toLowerCase().replace(/[^a-z0-9_/]/g, '');
            // console.log('FolderName', folderName)

            await imageKit.deleteFolder(folderName);

            await Product.destroy({
                where: { productId }
            });

            await ProductVariants.destroy({
                where:{productId}
            });

            await ProductSmPic.destroy({
                where: { productId }
            });

            await ProductLgPic.destroy({
                where: { productId }
            });

            return res.status(200).json({
                success: true,
                message: 'Product and associated images deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getTopProducts(req,res){
        try {
            const topProducts = await Product.findAll({
                where: { productTop: true }
            });
    
            return res.status(200).json({
                success: true,
                topProducts
            });
        } catch (error) {
            console.error('Error retrieving top products:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }


    static async getTopProductsByAmountEarned(req,res){
        try {
            const topProducts = await Product.findAll({
                order: [['productAmountEarned', 'DESC']], // Sort by productAmountEarned in descending order
                limit: 5 
            });
    
            return res.status(200).json({
                success: true,
                topProducts
            });
        } catch (error) {
            console.error('Error retrieving top products by amount earned:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async updateRelatedProduct(req,res){
        try {
            const {productId, relatedProduct, productAddInfo} = req.body;

            const product = await Product.findOne({where:{productId}});

            if(!product){
                return res.status(404).json({
                    success:false,
                    message:'Product not found'
                });
            }

            

            let existingRelatedProducts = product.relatedProducts || [];
            console.log('existingRelatedProducts', existingRelatedProducts);

            const newRelatedProductsArray = Array.isArray(relatedProduct)
            ? relatedProduct
            : [relatedProduct];

            console.log('newRelatedProductsArray', newRelatedProductsArray)

            const uniqueRelatedProductsSet = new Set([
                ...existingRelatedProducts.map(obj => JSON.stringify(obj)),
                ...newRelatedProductsArray.map(obj => JSON.stringify(obj)),
            ]);
            console.log('uniqueRelatedProducts', uniqueRelatedProductsSet);
            const updatedRelatedProducts = [...uniqueRelatedProductsSet].map(str => JSON.parse(str));
            console.log('updatedRelatedProducts', updatedRelatedProducts);
            
            let updatedProductShortDesc = product.productshortDesc;
            if (productAddInfo && productAddInfo.length > 0) {
                updatedProductShortDesc = productAddInfo;
            }


            await Product.update(
                {
                    relatedProducts: updatedRelatedProducts,
                    productshortDesc: updatedProductShortDesc,
                },
                { where: { productId } }
            );

            return res.status(200).json({
                success: true,
                message: 'Related products updated successfully',
                relatedProducts: updatedRelatedProducts,
            });
        } catch (error) {
            console.error('Error adding related products:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    static async postCommentProduct(req,res){
        try {
            const {productSlug, comment} = req.body;
            const userId = req.user.userId;

            const product = await Product.findOne({
                where:{
                    productSlug
                }
            });

            if(!product){
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            };

            const user = await User.findOne({ where: { userId } }, { attributes: ['firstName', 'lastName'] });
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const { firstName, lastName } = user;
            const userName = `${firstName} ${lastName}`;

            // Create a new comment object
            const newComment = {
                comment,
                user: userName
            };

            const existingComments = product.productComments || [];

            const updatedComments = [...existingComments, newComment];

            await Product.update(
                { productComments: updatedComments },
                { where: { productId: product.productId } }
            );

            return res.status(200).json({
                success: true,
                message: 'Comment added successfully',
                comments: updatedComments
            });
        } catch (error) {
            console.error('Error adding comment:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = ProductController;
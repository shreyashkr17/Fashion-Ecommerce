const Post = require('../model/post.model')
const Product = require('../model/product.model');
const ProductVariant = require('../model/variants.product.model');


const checkInput = (input) => {
    var emailRegex = /\S+@\S+\.\S+/;
    var usernameRegex = /^[a-zA-Z0-9]+$/;

    if(emailRegex.test(input)){
        return 'Email';
    }else if(usernameRegex.test(input)){
        return 'Username';
    }else{
        return 'Invalid';
    }
}

const convertSlug = async (productSlug) => {
    try {
        const product = await Product.findOne({where:{productSlug:productSlug}});
        if(!product){
            return null;
        }
        return product.productId;
    } catch (error) {
        return {"success":false, "message":`Error Found: ${error}`}
    }
}

const convertPostSlug = async (postSlug) =>{
    try {
        const post = await Post.findOne({
            where:{
                slug:postSlug
            }
        })

        if(!post){
            return null;
        }

        return post.postId;
    } catch (error) {
        return {"success":false, "message":`Error Found: ${error}`}
    }
};

const convertVariantProductSlug = async (variantSlug) =>{
    try {
        const variantProducts = await ProductVariant.findOne({
            where:{
                variantSlug:variantSlug
            }
        });

        if(!variantProducts){
            return null;
        }

        return variantProducts.variantId;
    } catch (error) {
        return {"success":false, "message":`Error Found: ${error}`}
    }
}

// const convertCollectionSkug = async (collectionSlug)
module.exports = {convertSlug,checkInput, convertPostSlug, convertVariantProductSlug}
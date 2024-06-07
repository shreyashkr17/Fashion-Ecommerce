const Post = require("../model/post.model");
const {v4:uuidv4} = require('uuid');
const ImageKit =  require("imagekit");
const validator = require('../utils/validator')
const {ImageConfig} = require('../config');

const User = require('../model/user.model');

const imageKit = new ImageKit({
    publicKey:ImageConfig.imageKitConfig.publicKey,
    privateKey:ImageConfig.imageKitConfig.privateKey,
    urlEndpoint:ImageConfig.imageKitConfig.urlEndpoint,
});
class PostController{
    static async uploadPost(req,res){
        try {
            const postData = req.body;
            const postId = uuidv4()
            // const files = req.files

            const folderName = `post/${postId}/`.toLowerCase().replace(/[^a-z0-9_/]/g, '');

            const uploadedImages = [];

            for(const file of req.files){
                const image = await imageKit.upload({
                    file:file.buffer,
                    fileName:file.originalname,
                    folder:folderName,
                });
                uploadedImages.push(image.url);
            }

            // console.log(uploadedImages)

            // if (typeof postData.blog_categories === 'string') {
            //     postData.blog_categories = JSON.parse(postData.blog_categories);
            // }

            if (!Array.isArray(postData.blog_categories)) {
                postData.blog_categories = [postData.blog_categories];
            }

            const newPost = await Post.create({
                postId:`${postId}`,
                author:postData.author,
                comments:postData.comments,
                content:postData.content,
                date:postData.date,
                slug:postData.slug,
                title: postData.title,
                type: postData.type,
                image:uploadedImages,
                blog_categories: postData.blog_categories,
            });

            res.status(201).json(newPost);
        } catch (error) {
            console.error('Error uploading post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async addComments(req,res){
        try {
            const {slug, content} = req.body;
            const userId = req.user.userId;
            console.log(userId)
            const post = await Post.findOne({
                where:{slug}
            })

            if(!post){
                return res.status(404).json({
                    message:'Post Not found'
                })
            };

            if (!post.commentContent) {
                post.commentContent = [];
            }

            const user = await User.findOne({
                where:{userId}
            });
            console.log(user)

            const firstName = user.firstName;
            const lastName = user.lastName; 

            if(firstName === null || lastName===null){
                return res.status(404).json({
                    message:"Update Dashoboard Details"
                })
            }

            const newComment = {
                firstName,
                lastName,
                content,
                date:new Date()
            };

            // post.commentContent.push(newComment);
            // post.comments+=1;

            // await post.save();

            await post.update({
                commentContent: [...post.commentContent, newComment],
                comments: post.comments + 1
            });
            
            res.status(200).json({
                message:"Comment added succesfully"
            })
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async gatherSlugCounts(req,res){
        try {
            const posts = await Post.findAll();
            const slugCounts = {}; 
            posts.forEach(post => {
                const categories = post.blog_categories; 
                if (categories && categories.length > 0) {
                    categories.forEach(category => {
                        const slug = category.slug;
                        if (slugCounts[slug]) {
                            slugCounts[slug]++;
                        } else {
                            slugCounts[slug] = 1;
                        }
                    });
                }
            });
            const result = Object.entries(slugCounts).map(([slug, count]) => ({
                name: slug.charAt(0).toUpperCase() + slug.slice(1), 
                slug: slug,
                count: count
            }));

            res.status(200).json({
                result
            });
        } catch (error) {
            console.error('Error gathering slug counts:', error);
            throw error;    
        }
    }

    static async addRelatedPosts(req,res){
        try {
            let { postSlug, relatedPost } = req.body;
            let postId = await validator.convertPostSlug(postSlug);

            postId = postId.trim();
            console.log(postId)

            const post = await Post.findOne({
                where: { postId }
            });

            if (!post) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }

            if (!Array.isArray(relatedPost)) {
                relatedPost = [relatedPost];
            }

            if (!post.relatedPost) {
                post.relatedPost = [];
            }

            const existingSlug = post.relatedPost.map(item => item.slug);

            console.log(existingSlug);
            let newRelatedPost = [];

            relatedPost.forEach(postItem => {
                if(existingSlug.includes(postItem.slug)){
                    console.log(`Slug "${postItem.slug}" already exists in the related posts.`);
                    // return;
                }else{
                    newRelatedPost.push(postItem);
                }
            });

            post.relatedPost = [...post.relatedPost, ...newRelatedPost];
            console.log("Before ",post.relatedPost);
            await post.save();
            console.log("After ",post.relatedPost);

            res.status(200).json({
                message: "Related post added successfully",
                post,
            });
            
        } catch (error) {
            console.error('Error adding related post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getAllComments(req,res){
        try {
            const {slug} = req.body;
            const post = await Post.findOne({
                where:{slug}
            });

            if(!post){
                return res.status(404).json({
                    message:"Post not found"
                });
            };

            const comments = post.commentContent || [];

            res.status(200).json({
                comments
            });
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getAllRelatedPost(req,res){
        try {
            const {slug} = req.body;
            const post = await Post.findOne({
                where:{slug}
            });

            if(!post){
                return res.status(404).json({
                    message:"Post not found"
                });
            }

            const relatedPosts = post.relatedPost || [];

            res.status(200).json({
                relatedPosts
            });
        } catch (error) {
            console.error('Error fetching related posts:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getPostDetails(req,res){
        try {
            const {slug} = req.body;

            const post = await Post.findOne({
                where: {slug}
            });

            if(!post){
                return res.status(404).json({
                    message:"Post not found"
                })
            };

            res.status(200).json({
                post
            });
        } catch (error) {
            console.error('Error fetching post details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getAllPosts(req,res){
        try {
            const posts = await Post.findAll();

            if(!posts || posts.length === 0){
                return res.status(404).json({
                    message:"No Post found"
                });
            };

            res.status(200).json({
                posts
            });
        } catch (error) {
            console.error('Error fetching all posts:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deletePosts(req,res){
        try {
            const {slug} = req.body;
            const post = await Post.findOne({
                where:{slug}
            });

            if(!post){
                return res.status(404).json({
                    message:"Post not found"
                });
            };

            const folderName = `post/${post.postId}/`.toLowerCase().replace(/[^a-z0-9_/]/g, '');

            await imagekit.deleteFolder(folderName);

            await Post.destroy({
                where:{slug}
            });

            res.status(200).json({
                message:"Post deleted successfully"
            });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateBlog(req,res){
        try {
            const {postId,title, content} = req.body;
            const post = await Post.findOne({
                where:{postId}
            });

            if(!post){
                return res.status(404).json({
                    message:"Post not found"
                });
            };

            post.title = title;
            post.content = content;

            await post.save();

            res.status(200).json({
                message:"Post updated successfully"
            });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = PostController
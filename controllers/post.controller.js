const Post = require("../models").Post
const PostImage = require("../models").PostImage

const create = async (req, res) => {
    try {
        const {title, description, date, additions, images} = req.body
        const newPost = await Post.create({
            title, description, date, additions
        })
        images.split(',').forEach(async img => {
            await PostImage.create({
                postId: newPost.id,
                image: img
            })
        })
        return res.json(newPost)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getAll = async (req, res) => {
    try {

        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 2;
        const allPosts = await Post.findAll({
            offset: offset * limit,
            limit,
            include:[PostImage]
        })
        const all =  await Post.findAll()

        return res.json({posts: allPosts,count:all.length})
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const getSingle = async (req, res) => {
    try {
        const {id} = req.query
        const post = await Post.findOne({
            where: {id},
            include:[PostImage]
        })
        return res.json(post)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const edit = async (req, res) => {
    try {
        const {id, title, description, date, additions} = req.body

        const post = await Post.findOne({
            where: {id}
        })
        post.title = title
        post.description = description
        post.date = date
        post.additions = additions
        await post.save()
        return res.json(post)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

const deletePost = async (req, res) => {
    try {
        const {id} = req.body
        await Post.destroy({
            where: {id}
        })
        const postImages = await PostImage.findAll({
            where: {
                postId: id
            }
        })
        postImages.forEach(async item => {
            await PostImage.destroy({
                where: {
                    postId: item.id
                }
            })
        })

        const allPosts = await Post.findAll({
            include:[PostImage]
        })

        return res.json(allPosts)
    } catch (e) {
        console.log('something went wrong', e)
    }
}

module.exports = {
    create,
    getAll,
    getSingle,
    edit,
    deletePost
}
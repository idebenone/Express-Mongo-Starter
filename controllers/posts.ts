import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from '../models/postSchema';
const posts = Router();

//CREATE A POST
posts.post("/", async (req: Request, res: Response) => {
    const { user, title, description, location } = req.body;

    try {
        const post = new Post({
            user: new mongoose.Types.ObjectId(user),
            title,
            description,
            location
        });
        const savedPost = await post.save();

        res.status(201).json({
            "message": "Post has been created!",
            "data": savedPost
        })
    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong !",
            "error": error.message
        })
    }
})

//GET POST DETAILS
posts.get("/:id", async (req: Request, res: Response) => {
    const post_id = req.params.id;

    try {
        const post = await Post.findById(post_id).populate('user', '-password').exec();
        res.status(200).json({
            "message": "Data fetched successfully",
            "data": post
        })

    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong !",
            "error": error.message
        })
    }
})

//GET ALL COMMENTS FOR A PARTICULAR POST
posts.get("/comments/:id", async (req: Request, res: Response) => {
    const post_id = req.params.id;

    try {
        const comments = await Post.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(post_id) } },
            {
                $lookup: {
                    "from": "comments",
                    "localField": "_id",
                    "foreignField": "post",
                    "as": "comments"
                }
            },
            {
                $project: {
                    "comments._id": 0,  // excluded field from comments array
                    "comments.post": 0, // excluded field from comments array
                    "comments.__v": 0   // excluded field from comments array
                }
            }
        ]);

        res.status(200).json({
            "message": "Data fetched successfully",
            "data": comments
        })

    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong !",
            "error": error.message
        })
    }
})

//UPDATE POST
posts.put("/", async (req: Request, res: Response) => {
    /* YOUR TURN TO FINISH THE CODE */
})

//DELETE POST
posts.delete("/", async (req: Request, res: Response) => {
    /* YOUR TURN TO FINISH THE CODE */
})


export default posts;
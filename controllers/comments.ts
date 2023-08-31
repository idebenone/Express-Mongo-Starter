import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Comment from '../models/commentSchema';
const comments = Router();

//CREATE A COMMENT
comments.post("/", async (req: Request, res: Response) => {
    const { user, post, comment } = req.body;

    try {
        const newComment = new Comment({
            user: new mongoose.Types.ObjectId(user),
            post: new mongoose.Types.ObjectId(post),
            comment
        })
        const savedComment = await newComment.save();

        res.status(201).json({
            "message": "Comment has been saved",
            "data": savedComment
        })
    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong !",
            "error": error.message
        })
    }
})

//GET DETAILS OF A PARTICULAR COMMENT
comments.get("/:id", async (req: Request, res: Response) => {
    const post_id = req.params.id;

    try {
        const comment = await Comment.findById(post_id).populate('post').populate('user', '_id username').exec();
        res.status(200).json({
            "message": "Data fetched successfully",
            "data": comment
        })
    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong !",
            "error": error.message
        })
    }
})

//UPDATE COMMENT
comments.put("/", async (req: Request, res: Response) => {
    /* YOUR TURN TO FINISH THE CODE */
})

//DELETE COMMENT
comments.delete("/", async (req: Request, res: Response) => {
    /* YOUR TURN TO FINISH THE CODE */
})

export default comments;
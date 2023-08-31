import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userSchema';
const users = Router();

//CREATE USER
users.post("/", async (req: Request, res: Response) => {
    const { name, username, password } = req.body;

    try {
        const user = new User({ name, username, password });
        const savedUser = await user.save();

        res.status(201).json({
            "message": "User data has been saved!",
            "data": savedUser
        });

    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong !",
            "error": error.message
        })
    }
})

//EDIT USER
users.put("/", async (req: Request, res: Response) => {
    const { id, name, username, password } = req.body
    try {
        const editUser = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(id),
            {
                name: name,
                username: username,
                password: password
            },
            {
                new: true
            }
        );

        if (!editUser) {
            res.status(400).json({
                "message": "User Not Found!"
            })
        }

        res.status(201).json({
            "message": "User updated successfully",
            "data": editUser
        })

    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong !",
            "error": error.message
        })
    }
})

//DELETE USER
users.delete("/:id", async (req: Request, res: Response) => {
    const user_id = req.params.id;

    try {
        const deleteUser = await User.findByIdAndDelete(user_id);
        if (!deleteUser) {
            res.status(400).json({
                "message": "User Not Found!"
            })
        }

        res.status(201).json({
            "message": "User deleted successfully",
            "data": deleteUser
        })

    } catch (error: any) {
        res.status(502).json({
            "message": "Something went wrong!",
            "error": error.message
        })
    }
})


export default users;
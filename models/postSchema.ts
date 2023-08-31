import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
    user: mongoose.Types.ObjectId,
    title: string,
    description: string,
    location: string,
    created_at: Date
}

const postSchema = new Schema<IPost>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    created_at: { type: Date, default: Date.now }
});


export default mongoose.model<IPost>('Post', postSchema);

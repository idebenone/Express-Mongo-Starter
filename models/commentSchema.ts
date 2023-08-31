import mongoose, { Document, Schema } from 'mongoose';

interface Comment extends Document {
    user: mongoose.Types.ObjectId,
    post: mongoose.Types.ObjectId,
    comment: string,
    created_at: Date
}

const commentSchema = new Schema<Comment>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model<Comment>('Comment', commentSchema);


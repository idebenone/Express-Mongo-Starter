import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
    name: string,
    username: string,
    password: string,
    created_at: Date,
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model<User>('User', userSchema);


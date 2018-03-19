/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    deviceHash: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

UserSchema.methods = {
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.AUTH_JWT_SECRET,
    );
  },
};

export default mongoose.model('User', UserSchema);
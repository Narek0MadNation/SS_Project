import { model, Model, Schema, Document, Types } from "mongoose";

interface LikeAttrs {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  type: string;
}

interface LikeDoc extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  type: string;
}

interface LikeModel extends Model<LikeDoc> {
  build(attrs: LikeAttrs): LikeDoc;
}

const likesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  type: { type: String, enum: ["like", "dislike"], default: null },
});

likesSchema.statics.build = (attrs: LikeAttrs) => {
  return new Like(attrs);
};

const Like = model<LikeDoc, LikeModel>("Like", likesSchema);

export default Like;

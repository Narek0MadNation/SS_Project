import { model, Model, Schema, Document, Types } from "mongoose";

interface PostAttrs {
  userId: string;
  title: string;
  context: string;
  image: string;
  // like: string;
  // comments: Types.ObjectId[];
  // tags: Types.ObjectId[];
}

interface PostDoc extends Document {
  userId: Types.ObjectId;
  title: string;
  context: string;
  image: string;
  // like: string;
  // comments: Types.ObjectId[];
  // tags: Types.ObjectId[];
}

interface PostModel extends Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

const postsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  context: { type: String, required: true },
  image: { type: String, required: true },
  // like: { type: Schema.Types.ObjectId, ref: "Like" },
  // comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],
  // tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
});

postsSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = model<PostDoc, PostModel>("Post", postsSchema);

export default Post;

import { model, Model, Schema, Document, Types } from "mongoose";

interface PostAttrs {
  userId: string;
  title: string;
  content: string;
}

interface PostDoc extends Document {
  userId: string;
  title: string;
  content: string;
}

interface PostModel extends Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

const postsSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

postsSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = model<PostDoc, PostModel>("Post", postsSchema);

export { Post };

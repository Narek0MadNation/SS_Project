import { model, Model, Schema, Document, Types } from "mongoose";

interface CommentAttrs {}

interface CommentDoc extends Document {}

interface CommentModel extends Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentsSchema = new Schema({});

commentsSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = model<CommentDoc, CommentModel>("Comment", commentsSchema);

export default Comment;

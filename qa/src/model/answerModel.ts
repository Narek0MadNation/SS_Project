import { model, Model, Schema, Document } from "mongoose";

interface AnswerAttrs {
  content: string;
  userId: string;
  questionId: string;
}

interface AnswerDoc extends Document {
  content: string;
  userId: string;
  questionId: string;
}

interface AnswerModel extends Model<AnswerDoc> {
  build(attrs: AnswerAttrs): AnswerDoc;
}

const answerSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: String, required: true },
    questionId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

answerSchema.statics.build = (attrs: AnswerAttrs) => {
  return new Answer(attrs);
};

const Answer = model<AnswerDoc, AnswerModel>("Answer", answerSchema);

export { Answer };

import { model, Model, Schema, Document } from "mongoose";

interface QuestionAttrs {
  userId: string;
  title: string;
  content: string;
}

interface QuestionDoc extends Document {
  userId: string;
  title: string;
  content: string;
  answers: string;
}

interface QuestionModel extends Model<QuestionDoc> {
  build(attrs: QuestionAttrs): QuestionDoc;
}

const questionSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    answers: [{ type: String, ref: "Answer" }],
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

questionSchema.statics.build = (attrs: QuestionAttrs) => {
  return new Question(attrs);
};

const Question = model<QuestionDoc, QuestionModel>("Question", questionSchema);

export { Question };

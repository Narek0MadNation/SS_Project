import { model, Model, Schema, Document } from "mongoose";
import { Password } from "../service/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends Document {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export default User;

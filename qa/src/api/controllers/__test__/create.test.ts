import request from "supertest";
import { app } from "../../../app";
import { Question } from "../../../model/questionModel";

it("has route listening to /api/qa for post requests", async () => {
  const response = await request(app).post("/api/qa").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed of the user is is signed in", async () => {
  await request(app).post("/api/qa").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({
      title: "",
      content: "test content",
    })
    .expect(400);

  await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({
      title: "test title",
      content: "",
    })
    .expect(400);

  await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({
      title: "test title",
    })
    .expect(400);

  await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({
      content: "test content",
    })
    .expect(400);
});

it("creates a question with valid inputs", async () => {
  const existingQuestion = await Question.find({});
  expect(existingQuestion.length).toEqual(0);

  const title = "test title";
  const content = "test content";

  await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({
      title,
      content,
    })
    .expect(201);

  const questionsAfterCreate = await Question.find({});
  expect(questionsAfterCreate.length).toEqual(1);
  expect(questionsAfterCreate[0].title).toEqual(title);
  expect(questionsAfterCreate[0].content).toEqual(content);
});

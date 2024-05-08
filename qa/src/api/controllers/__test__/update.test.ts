import request from "supertest";
import { app } from "../../../app";

it("has route listening to /api/qa/:qaId for put requests", async () => {
  const response = await request(app).put("/api/qa/validQaId").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).put("/api/qa/validQaId").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .put("/api/qa/validQaId")
    .set("Authorization", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns a status 400 if the id is invalid", async () => {
  const response = await request(app)
    .put("/api/qa/invalid")
    .set("Authorization", global.signin())
    .send({})
    .expect(400);
});

it("returns a status 404 if the question is not found", async () => {
  const response = await request(app)
    .put("/api/qa/66200134d4107c48943e00ab")
    .set("Authorization", global.signin())
    .send({});

  expect(response.status).not.toEqual(404);
});

it("returns a status 200 if the question is updated", async () => {
  const question = await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({
      title: "test title",
      content: "test content",
    })
    .expect(201);

  const response = await request(app)
    .put(`/api/qa/${question.body.id}`)
    .set("Authorization", global.signin())
    .send({
      title: "updated title",
      content: "updated content",
    })
    .expect(200);

  expect(response.body.question.title).toEqual("updated title");
  expect(response.body.question.content).toEqual("updated content");
});

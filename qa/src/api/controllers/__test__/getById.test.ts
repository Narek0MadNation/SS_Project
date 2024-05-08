import request from "supertest";
import { app } from "../../../app";

it("has route listening to /api/qa/:qaId for get requests", async () => {
  const response = await request(app).get("/api/qa/validQaId").send({});

  expect(response.status).not.toEqual(404);
});

it("returns a status 400 if the id is invalid", async () => {
  await request(app).get("/api/qa/invalid").send({}).expect(400);
});

it("returns a status 404 if the question is not found", async () => {
  const response = await request(app)
    .get("/api/qa/66200134d4107c48943e00ab")
    .send({});

  expect(response.status).not.toEqual(404);
});

it("returns the question if the id is valid", async () => {
  const question = await request(app)
    .post("/api/qa")
    .set("Authorization", global.signin())
    .send({
      title: "test title",
      content: "test content",
    })
    .expect(201);

  await request(app).get(`/api/qa/${question.body.id}`).send({}).expect(200);
});

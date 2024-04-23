import request from "supertest";
import { app } from "../../app";

it("has a route listening to /api/posts/:id for get requests", async () => {
  const response = await request(app).get("/api/posts/validPostId").send({});
  expect(response.status).not.toEqual(401);
});

it("returns a status 400 if the id is not valid", async () => {
  await request(app).get("/api/posts/invalid").send({}).expect(400);
});

it("returns a status 404 if the post is not found", async () => {
  await request(app)
    .get("/api/posts/66200134d4107c48943e00ab")
    .send({})
    .expect(404);
});

it("returns the post if the id is valid", async () => {
  const validPost = await request(app)
    .post("/api/posts")
    .set("Authorization", global.signin())
    .send({
      title: "test title",
      content: "test content",
    })
    .expect(201);

  const response = await request(app)
    .get(`/api/posts/${validPost.body.id}`)
    .send({});
  expect(response.status).toEqual(200);
  expect(response.body).toEqual(validPost.body);
});

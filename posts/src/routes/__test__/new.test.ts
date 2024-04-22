import request from "supertest";
import { app } from "../../app";
import { Post } from "../../model/postModel";

it("has a route handler listening to /api/posts for post requests", async () => {
  const response = await request(app).post("/api/posts").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/posts").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/posts")
    .set("Authorization", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/posts")
    .set("Authorization", global.signin())
    .send({
      title: "",
      content: "test",
    })
    .expect(400);

  await request(app)
    .post("/api/posts")
    .set("Authorization", global.signin())
    .send({
      title: "test",
      content: "",
    })
    .expect(400);

  await request(app)
    .post("/api/posts")
    .set("Authorization", global.signin())
    .send({
      content: "test",
    })
    .expect(400);

  await request(app)
    .post("/api/posts")
    .set("Authorization", global.signin())
    .send({
      title: "test",
    })
    .expect(400);
});

it("creates a post with valid inputs", async () => {
  let posts = await Post.find({});
  expect(posts.length).toEqual(0);

  const title = "test title";
  const content = "test content";

  await request(app)
    .post("/api/posts")
    .set("Authorization", global.signin())
    .send({
      title,
      content,
    })
    .expect(201);

  posts = await Post.find({});
  expect(posts.length).toEqual(1);
  expect(posts[0].title).toEqual(title);
  expect(posts[0].content).toEqual(content);
});

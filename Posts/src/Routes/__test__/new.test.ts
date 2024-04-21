import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/posts for post requests", async () => {
  const response = await request(app).post("/api/posts").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/posts").send({}).expect(401);
});

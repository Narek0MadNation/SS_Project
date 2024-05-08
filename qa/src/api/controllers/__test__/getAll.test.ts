import request from "supertest";
import { app } from "../../../app";

it("has a route listening to /api/qa for get requests", async () => {
  const response = await request(app).get("/api/qa").send({});

  expect(response.status).not.toEqual(404);
});

it("returns an empty array if no questions are found", async () => {
  const response = await request(app).get("/api/qa").send({});

  expect(response.status).toEqual(200);
  expect(response.body).toEqual([]);
});

it("returns the array of questions if there are questions", async () => {
  const response = await request(app).get("/api/qa").send({});

  expect(response.status).toEqual(200);
});

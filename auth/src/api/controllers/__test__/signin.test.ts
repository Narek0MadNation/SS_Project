import request from "supertest";
import { app } from "../../../app";

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test",
      password: "1234567",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "123",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({
      password: "1234567",
    })
    .expect(400);
});

it("returns a 400 when an email that does not exist is supplied", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "1234567",
    })
    .expect(400);
});

it("returns a 400 when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1234567",
    })
    .expect(201);
});

it("sets a Bearer token after successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1234567",
    })
    .expect(201);

  const response = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "1234567",
  });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("token");
});

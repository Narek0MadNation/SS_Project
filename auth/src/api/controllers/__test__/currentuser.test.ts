import request from "supertest";
import { app } from "../../../app";
import { sign, verify } from "jsonwebtoken";

it("returns the current user if a valid token is provided", async () => {
  const payload = {
    _id: "user_id",
    email: "test@test.com",
  };

  const token = sign(payload, process.env.JWT_KEY!);

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body._id).toEqual(payload._id);
  expect(response.body.email).toEqual(payload.email);
});

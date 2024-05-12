import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/media/upload for post requests", async () => {
  const response = await request(app).post("/api/media/upload").send({});
  expect(response.status).not.toEqual(404);
});

it("returns a 400 if the request does not contain a file", async () => {
  await request(app).post("/api/media/upload").expect(400);
});

it("returns a 400 if the file is not an image", async () => {
  const buffer = Buffer.from("not an image");

  await request(app)
    .post("/api/media/upload")
    .attach("image", buffer, "notImage.txt")
    .expect(400);
});

it("returns a 400 if the file is too large", async () => {
  const buffer = Buffer.alloc(10 * 1024 * 1024);
  await request(app)
    .post("/api/media/upload")
    .attach("image", buffer, "largeImage.jpg")
    .expect(400);
});

it("can upload a valid image", async () => {
  const buffer = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAPsAAABYABIAAAAbZ2NlAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADs3d3cDAAAAFBJREFUeNpiYBAgAAAABD7N0VYAAAAASUVORK5CYII="
  );
  const response = await request(app)
    .post("/api/media/upload")
    .attach("image", buffer, "validImage.jpg");
  expect(response.status).toEqual(200);
  expect(response.body).toHaveProperty("file");
  expect(response.body.file).toHaveProperty("fieldname", "image");
  expect(response.body.file).toHaveProperty("originalname", "validImage.jpg");
  expect(response.body.file).toHaveProperty("mimetype", "image/jpeg");
  expect(response.body.file).toHaveProperty("size");
  expect(response.body.file).toHaveProperty("filename");
  expect(response.body.file).toHaveProperty("path");
});

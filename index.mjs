import { readFile, readFileSync } from "node:fs";
import * as http from "node:http";

const servePage = (url, res) => {
  if (url.split("/")[2] === "home" || url === "/") {
    readFile(`pages/index.html`, "utf-8", (err, data) => {
      res.writeHead(err ? 404 : 200, {
        "Content-Type": "text/html;charset=utf-8",
      });
      res.write(
        err || url.split("/")[2] === "home"
          ? readFileSync("pages/404.html")
          : data
      );
      res.end();
    });
  } else {
    readFile(`pages/${url.split("/")[2]}.html`, "utf-8", (err, data) => {
      res.writeHead(err ? 404 : 200, {
        "Content-Type": "text/html;charset=utf-8",
      });
      res.write(err ? readFileSync("pages/404.html") : data);
      res.end();
    });
  }
};

const app = http.createServer((req, res) => {
  if (req.method === "GET") servePage(req.url, res);
});

app.listen(4000, () => console.log("Server is running on port 4000"));

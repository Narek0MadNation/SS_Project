import { readFile, readFileSync } from "node:fs";
import * as http from "node:http";

const servePage = (url, res) => {
  const getPage = (url) => {
    return url.split("/")[2] === "home" || url === "/"
      ? "index.html"
      : `${url.split("/")[2]}.html`;
  };

  readFile(`pages/${getPage(url)}`, "utf-8", (err, data) => {
    res.writeHead(err ? 404 : 200, {
      "Content-Type": "text/html;charset=utf-8",
    });
    res.write(
      err || url.split("/")[2] === "index"
        ? readFileSync("pages/404.html")
        : data
    );
    res.end();
  });
};

const app = http.createServer((req, res) => {
  if (req.method === "GET") servePage(req.url, res);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

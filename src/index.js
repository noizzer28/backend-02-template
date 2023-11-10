const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const getUsers = require("./modules/users");
const { URL } = require("url");

const server = http.createServer((request, response) => {
  const url = new URL(`http://${request.headers.host}${request.url}`);
  const helloParam = url.searchParams.get("hello");
  const usersParam = url.searchParams.get("users");

  if (helloParam !== null) {
    if (helloParam === "") {
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain");
      response.write("Enter a name");
    } else {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, ${helloParam}.`);
    }
  } else if (usersParam !== null) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
  } else if (url.searchParams.toString() === "") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
  } else {
    response.statusCode = 500;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write("failed");
  }

  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});

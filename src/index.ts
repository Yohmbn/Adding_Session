import express from "express";
import nunjucks from "nunjucks";
import { ListUsers } from "./ListUsers";
import cookie from "cookie";
const app = express();

const formParser = express.urlencoded({ extended: true });

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.get("/", (request, response) => {
  response.render("home"); // 🔎 See? "home"!
});

app.get("/login", (request, response) => {
  response.render("login");
});

app.post("/dataBase", formParser, (request, response) => {
  const user = request.body.username;
  const password = request.body.password;
  let Verifier = false;
  console.log(user, password);

  ListUsers.forEach((element) => {
    if (element.name === user && element.password === password) {
      Verifier = true;
    } else {
      console.log("unknown");
    }
  });
  if (Verifier) {
    response.set(
      "Set-Cookie",
      cookie.serialize("User connected", user, {
        maxAge: 3600,
      }),
    );
    response.render("private");
  } else {
    response.redirect("/");
  }
});

app.listen(1000, () => {
  console.log("Server started on http://localhost:1000");
});

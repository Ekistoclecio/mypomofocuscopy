const http = require("http");
const express = require("express");
const app = express();
const db = require("./db.json");
const fs = require("fs");
const crypto = require("crypto");
const cors = require("cors");

require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

app.post("/setConfig", verifyJWT, (req, res, next) => {
  for (let i = 0; i < db.length; i++) {
    if (req.userId === db[i].id) {
      db[i].objConfig = req.body;
      fs.writeFile("./db.json", JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log("Done writing");
      });
      return res.status(200).json({
        mensagem: "Settings saved successfully",
        auth: true,
      });
    }
  }
});

app.post("/sigin", (req, res, next) => {
  for (let i = 0; i < db.length; i++) {
    if (req.body.email == db[i].email && req.body.password == db[i].password) {
      const id = db[i].id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300, // expires in 5min
      });
      return res.json({
        auth: true,
        token: token,
        config: db[i].objConfig,
      });
    }
  }
  return res.status(200).json({ message: "invalid login!" });
});

const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

app.post("/sigup", (req, res, next) => {
  console.log("entrei");
  if (regexEmail.test(req.body.email)) {
    for (let i = 0; i < db.length; i++) {
      if (req.body.email === db[i].email) {
        return res.json({ mensagem: "Email already registered" });
      }
    }
    if (req.body.password === req.body.repeatPassword) {
      if (req.body.password.length < 8) {
        return res.json({
          mensagem: "The password must have at least 8 characters",
        });
      }
      const newUser = {
        id: crypto.createHash("sha1").update(req.body.email).digest("hex"),
        email: req.body.email,
        password: req.body.password,
        objConfig: {},
      };
      db.push(newUser);
      fs.writeFile("./db.json", JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log("Done writing");
      });
      return res
        .status(200)
        .json({ mensagem: "User successfully registered", register: true });
    } else {
      return res.json({ mensagem: "Passwords are not the same" });
    }
  } else {
    return res.json({ mensagem: "Invalid email" });
  }
});

const server = http.createServer(app);
server.listen(3001);
console.log("Servidor escutando na porta 3001...");

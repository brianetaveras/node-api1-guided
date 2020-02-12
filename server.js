const express = require("express");
let users = require("./users.js");
const server = express();

// This is a middleware that allows express
// to parse JSON request bodies.
server.use(express.json());

server.get("/", (req, res) => {
  res.json({
    message: "hello, world!"
  });
});

server.get("/users", (req, res) => {
  res.json(users);
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u.id == id);

  user ? res.json(user) : res.status(404).json({ message: "User not found" });
});

server.get("/brian", (req, res) => {
  res.redirect("https://briantastic.com");
});

server.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  // 201 means success and a resource was created
  res.status(201).json(newUser);
});

server.put("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);

  if (index) {
    users[index].name = req.body.name;
    res.status(200).json(users);
  } else {
      console.log(index)
    res.status(404).json({ message: "User not found" });
  }
});

server.delete("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    users = users.filter(u => {
      return u.id != req.params.id;
    });
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

server.listen(8080, () => {
  console.log("Server started at http://localhost:8080");
});

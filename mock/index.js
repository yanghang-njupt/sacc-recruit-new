const express = require("express");
const app = express();
const adminLogin = require("./data/admin_login.json");
const userLogin = require("./data/user_login.json");
const operatorLogin = require("./data/operator_login.json");
const adminPermission = require("./data/admin_permission.json");
const userPermission = require("./data/user_permission.json");
const operatorPermission = require("./data/operator_permission.json");
const url = require("url");

app.get("/login", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  if (user === "admin") {
    res.send(adminLogin);
  } else if (user === "operator") {
    res.send(operatorLogin);
  } else {
    res.send(userLogin);
  }
});
app.get("/permission", (req, res) => {
  const user = url.parse(req.url, true).query.user;
  if (user === "admin") {
    res.send(adminPermission);
  } else if (user === "operator") {
    res.send(operatorPermission);
  } else {
    res.send(userPermission);
  }
});

app.listen(3300, () => {
  console.log("服务器在3300端口运行");
});

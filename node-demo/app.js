#!/usr/bin/env node
const express = require("express");
const proxy = require("express-http-proxy");
const app = express();
app.use(express.static(`${__dirname}/public`));
app.get("/1", function(req, res) {
  res.sendFile(`${__dirname}/public/1.html`);
});
app.use("/a", proxy("www.flqin.com"));
app.listen(3000, () => {
  console.log("服务已启动：localhost:3000");
});

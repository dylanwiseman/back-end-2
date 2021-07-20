const express = require("express");
const cors = require("cors");
const ctrl = require("./controller")
const path = require('path')

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path("./public/index.html"));
  });

app.get("/api/houses",ctrl.getHouses);
app.post("/api/houses",ctrl.createHouse);
app.put("/api/houses/:id",ctrl.updateHouse);
app.delete("/api/houses/:id",ctrl.deleteHouse);

const port = process.env.PORT

app.listen(port, () => console.log(`server running`));
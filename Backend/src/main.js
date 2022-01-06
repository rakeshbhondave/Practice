let express = require("express");
let app = express();
app.use(express.json);

let cors = require("cors");
app.use(cors());

let { showData, adduser } = require("./user.js");

app.get("/home", async (req, res) => {
  let list = await showData();
  res.json(list);
});

app.post("/home-add", async (req, res) => {
  let user = req.body;
  await adduser(user);
  res.json({ message: "new User added" });
});

app.listen(4000, () => {
  console.log("server started");
});

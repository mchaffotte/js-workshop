const express = require("express");

const app = express();

const db = require("./repository");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to express workshop." });
});

require("./controllers")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

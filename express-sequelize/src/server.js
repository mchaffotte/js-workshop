const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./repository");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to express workshop." });
});

require("./routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

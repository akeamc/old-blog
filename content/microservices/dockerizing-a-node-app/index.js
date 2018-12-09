const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello 🌍\n");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
}); // Remember the port number!
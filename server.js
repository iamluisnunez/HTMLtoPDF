const express = require("express");
const app = express();

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

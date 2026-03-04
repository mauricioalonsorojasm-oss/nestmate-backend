process.loadEnvFile()

const express = require("express");
const app = express();

// initialize DB connection
require("./db")

// all middlewares & configurations here
const config = require("./config")
config(app)

app.use(express.json());

app.get("/", (req, res) => {
  res.json("API working 🚀");
});

app.listen(5005, () => {
  console.log("Server running");
});

// all routes here...
//const indexRouter = require("./routes/index.routes")
//app.use("/api", indexRouter)

// Error Handling
const errorHandling = require("./errors")
errorHandling(app)

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
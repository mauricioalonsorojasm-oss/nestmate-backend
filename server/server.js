process.loadEnvFile()

const express = require("express");
const app = express();

// initialize DB connection
require("./db")

// all middlewares & configurations here
const config = require("./config")
config(app)


// all routes here...
const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)

// Error Handling
const errorHandling = require("./errors")
errorHandling(app)

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
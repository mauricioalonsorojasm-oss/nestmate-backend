require("dotenv").config();

const express = require("express");
const app = express();

// DB
const connectDb = require("./db");
app.use(async (req, res, next) => {
    console.log("attepting to connect to DB...");
    await connectDb();
    next();
})


// Config (morgan, cors, json, etc)
const config = require("./config");
config(app);

// Health check
app.get("/", (req, res) => {
res.status(200).send("OK");
});

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ROUTES (después de config)
const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);



// 404
app.use((req, res) => {
res.status(404).json({ message: "Route not found" });
});

// Error handling
const errorHandling = require("./errors");
errorHandling(app);

// Listen
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
console.log(`Server listening on http://localhost:${PORT}`);
});



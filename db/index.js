const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("All good, connected to the Database")
})
.catch((error) => {
  console.log(error)
})
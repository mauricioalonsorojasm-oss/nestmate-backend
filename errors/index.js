function errorHandling(app) {
  // 404 Errors
  app.use((req, res) => {
    res.status(404).json({errorMessage: "Route not found!"})
  })

  // 500 Errors handler (why? because it has 4 parameters)
  app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({errorMessage: "Server broke down! Sorry, we will try to fix it"})
  })
}

module.exports = errorHandling


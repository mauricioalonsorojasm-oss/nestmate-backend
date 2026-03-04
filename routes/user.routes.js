const router = require("express").Router();
const User = require("../models/User.model");

// GET /api/users - Devuelve todos los usuarios (solo para desarrollo)
router.post("/users", async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    console.log("BODY:", req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    next(error);
  }
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json(updated);
  } catch (error) {
    console.log('error');
    next(error);
  }
});


module.exports = router;
const router = require("express").Router();
const User = require("../models/User.model");
const verifyToken = require("../middlewares/auth.middlewares")

// POST /api/users - Create user dev test only
router.post("/users", async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    console.log("BODY:", req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

// GET /api/users - Devuelve todos los usuarios (solo para desarrollo) // dev test only


router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id - Devuelve un usuario por ID // dev test only

/*router.get("/users/:id", async (req, res, next) => {
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
});*/

// PUT /api/users/:id - Actualiza un usuario por ID // dev test only

/*router.put("/users/:id", async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json(updated);
  } catch (error) {
    console.log('error');
    next(error);
  }
});*/



// PRIVATE ROUTES - require token verification

// GET /api/users/me - Devuelve el perfil del usuario autenticado
router.get("/users/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    next(error);
  }
});


// PUT /api/users/:id - Actualiza un usuario por ID // dev test only

router.put("/users/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const updated = await User.findByIdAndUpdate(userId, req.body);
    console.log("BODY:", req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:id/photoUrl - Upload user profile picture
router.post("/users/:id/photoUrl", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const { photoUrl } = req.body;
    const updated = await User.findByIdAndUpdate(userId, { photoUrl });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
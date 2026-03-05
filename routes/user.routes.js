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

// GET /api/users/:id - Devuelve el perfil del usuario autenticado
router.get("/users/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const user = await User.findById(userId)
    .select("-password -email");
    res.json(user);
  } catch (error) {
    next(error);
  }
});


// GET /api/users/me - get my profile
router.get("/users/me", verifyToken, async (req, res, next) => {
  try {

    const userId = req.payload._id // id of the logged-in user from the token

    const user = await User.findById(userId)
      .select("-password")

    res.status(200).json(user)

  } catch (error) {
    next(error)
  }
});




// PUT /api/users/:id - Actualiza un usuario por ID // dev test only

router.put("/users/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const updated = await User.findByIdAndUpdate(userId, req.body)//solo se edita cada uno del usuario.
    .select("-password -email");
    delete req.body.password; // Evitar que se devuelva la contraseña en la respuesta
    delete req.body.email; // Evitar que se devuelva el email en la respuesta
   
    res.status(200).json({ Message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/me/photoUrl
router.post("/users/me/photoUrl", verifyToken, async (req, res, next) => {
  try {

    const userId = req.payload._id; // logged-in user id
    const { photoUrl } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photoUrl },
      { new: true }
    );

    res.status(200).json({ Message: "Profile photo updated successfully", photoUrl: updatedUser.photoUrl });

  } catch (error) {
    next(error);
  }
});




module.exports = router;
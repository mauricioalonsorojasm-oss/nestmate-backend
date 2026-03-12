const router = require("express").Router();
const User = require("../models/User.model");
const verifyToken = require("../middlewares/auth.middlewares")
const fileUploader = require("../middlewares/cloudinary.config")





// PRIVATE ROUTES - require token verification


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

// GET /api/users/:id - devuelve el perfil de otro usuario
router.get("/users/:id", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password -email");

    res.status(200).json(user);
 } catch (error) {
    next(error);
 }
});




// PUT /api/users/:id - Actualiza un usuario por ID // 

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
/*router.post("/users/me/photoUrl", verifyToken, async (req, res, next) => {
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
});*/

router.post(
  "/users/me/photo-upload",
  verifyToken,
  fileUploader.single("image"),
  async (req, res, next) => {
    try {
      const userId = req.payload._id;
      console.log("File uploaded:", req.file);
      console.log("Request body:", req.body);

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { photoUrl: req.file.path },
        { new: true }
      );

      res.status(200).json({
        message: "Profile photo uploaded successfully",
        photoUrl: updatedUser.photoUrl,
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middlewares");
const User = require("../models/User.model")

// GET "/api/favorites" => return all favorite listings

router.get("/", verifyToken, async (req, res, next) => {
  try {

    const userId = req.payload._id;
    console.log("USER ID:", userId);

    const user = await User.findById(userId)
    
      .populate("favorites")
      .select("favorites");
      console.log("USER:", user);

    res.json(user.favorites);

  } catch (error) {
    next(error);
  }
});

// PATCH /api/users/favorites/:listingId  -> add to favorites
router.patch("/:listingId", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const { listingId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: listingId } }, // $addToSet adds the listingId to the favourites array only if it doesn't already exist, preventing duplicates
      { new: true }
    )
      .populate("favorites")
      .select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/favorites/:listingId  -> remove from favorites

router.delete("/:listingId", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const { listingId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: listingId } },
      { new: true }
    )
      .populate("favorites")
      .select("-password");

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
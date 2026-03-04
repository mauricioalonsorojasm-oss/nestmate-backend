const router = require('express').Router()
const Listing = require("../models/Listing.model")

const verifyToken = require("../middlewares/auth.middlewares")


// POST "/api/listings" => Create a listing

router.post("/listings", verifyToken, async (req, res, next) => {

  try {
    const createdListing = await Listing.create({
      ...req.body,
      owner: req.payload._id
    })
    res.status(201).json(createdListing)

  } catch (error) {
    next(error)
  }

})

//GET "/api/listings" => Get all listings

router.get("/listings", async (req, res, next) => {

  try {
    const listings = await Listing.find().populate("owner", "name email") 
    res.json(listings)
  } catch (error) {
    next(error)
  }
})

// GET "/api/listings/:id" => Get a listing by id
router.get("/listings/:id", async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner", "name email");
    if (!listing) {
      return res.status(404).json({ errorMessage: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/listings/:id" => Update listing
router.put("/listings/:id", verifyToken, async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } returns the updated document
    if (!listing) {
      return res.status(404).json({ errorMessage: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/listings/:id" => Delete listing
router.delete("/listings/:id", verifyToken, async (req, res, next) => {
  try {

    await Listing.findByIdAndDelete(req.params.id);

    res.sendStatus(204);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
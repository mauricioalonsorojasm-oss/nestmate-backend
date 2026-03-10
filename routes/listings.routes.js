const router = require('express').Router()
const Listing = require("../models/Listing.model")

const verifyToken = require("../middlewares/auth.middlewares")


// POST "/api/listings" => Create a listing

router.post("/", verifyToken, async (req, res, next) => {

  try {
    const createdListing = await Listing.create({
      ...req.body, // spread operator: copies all properties from req.body (e.g. title, description, price)
      owner: req.payload._id
    })
    res.status(201).json(createdListing)

  } catch (error) {
    next(error)
  }

})

//GET "/api/listings" => Get all listings

router.get("/", async (req, res, next) => {

  try {
    const listings = await Listing.find()
    .select("title city price description photoUrl petsAllowed smokerAllowed") // only lisiting fields, not owner
    res.json(listings)
  } catch (error) {
    next(error)
  }
})

// GET "/api/listings/:id" => Get a listing by id
router.get("/:id", async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner", "name");
    if (!listing) {
      return res.status(404).json({ errorMessage: "Listing not found" });
    }
    res.json(listing);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/listings/:id" => Update listing //Solamente el usuario puede editar.Y eliminar.
router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id; // ID del usuario autenticado
    delete req.body.owner; // Evitar que el cliente cambie el propietario del listing
    delete req.body._id; // Evitar que el cliente cambie el ID del listing
    delete req.body.city; // 
    delete req.body.title; // Evitar que el cliente cambie la ciudad y el título del listing, ya que son campos obligatorios
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, owner: userId },
      req.body,
      { new: true }
    );
    if (!listing) {
      return res.status(404).json({ errorMessage: "No authorized to edit this listing" });
    }
    res.json(listing);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/listings/:id" => Delete listing
router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
     const userId = req.payload._id;
    const listing = await Listing.findByIdAndDelete({ _id: req.params.id, owner: userId });
    if (!listing) {
      return res.status(404).json({ errorMessage: "No authorized to delete this listing" });
    }
   
    res.sendStatus(204);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
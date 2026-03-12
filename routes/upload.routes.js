const router = require("express").Router();
const fileUploader = require("../middlewares/cloudinary.config");

router.post("/", fileUploader.single("image"), (req, res, next) => {
  try {
    console.log("REQ.FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "Upload successful",
      fileUrl: req.file.path,
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
    console.log(error.name);
    next(error);
  }
});

module.exports = router;
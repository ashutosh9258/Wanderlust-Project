const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");;
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfiger.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

//new listing
router.get("/new",isLoggedIn, listingController.renderNewListingForm);

//filter listing
router.route("/filter")
    .get(wrapAsync(listingController.filterListing));

//search route 
router.route("/filterSearch")
    .get(wrapAsync(listingController.searchListing));


router.route("/:id")
    .get(wrapAsync(listingController.renderShowListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditListingForm));



module.exports = router;
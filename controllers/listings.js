const Listing = require("../models/listing.js");

//show index page
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

//render new listing form
module.exports.renderNewListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

//create new listing
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "Listing Created Successfuly");
    res.redirect("/listings");
};

//render edit listing form
module.exports.renderEditListingForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you trying to access does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload", "/upload/w_300");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//update exist listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidation: true });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        listing.save();
    }

    req.flash("success", "Listing Edit Successfuly");
    res.redirect(`/listings/${id}`);
};

//destory listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfuly");
    res.redirect("/listings");
};

//show listing
module.exports.renderShowListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you trying to access does not exist");
        res.redirect("/listings");
    } else {
        res.render("listings/show.ejs", { listing });
    }

};

module.exports.filterListing = async (req, res) => {
    let filter = req.query.type;
    let filteredListing = await Listing.find({ category: filter });
    if (filteredListing.length === 0) {
        req.flash("error", `No Listing are currently available on category ${filter}`);
        return res.redirect(`/listings`);
    }
    res.render("listings/filter.ejs", { filteredListing, filter });
};

module.exports.searchListing = async (req,res) => {
    let {userCountry} = req.query;
    let country = userCountry.charAt(0).toUpperCase() + userCountry.slice(1).toLowerCase();
    let filteredListing = await Listing.find({country: country});
    let filter = country;
    if (filteredListing.length === 0) {
        req.flash("error", `No Listing are currently available in ${country}`);
        return res.redirect(`/listings`);
    }
    res.render("listings/filter.ejs", {filteredListing, filter});
}
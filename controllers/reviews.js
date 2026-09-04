const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//create new review
module.exports.createReview = async (req, res) =>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Your Review Added");
    res.redirect(`/listings/${listing._id}`);
};

//destroy review
module.exports.destroyReview = async (req,res) => {
    let { id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Your Review Deleted");

    res.redirect(`/listings/${id}`);
};
import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

// router.route("/").get((req, res) => res.send("Hello world!"))
router.route("/move/:id").get(ReviewsCtrl.apiGetReview)
router.route("/new").post(ReviewsCtrl.apiPostReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeletReview)

export default router
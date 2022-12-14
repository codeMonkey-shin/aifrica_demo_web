const router = require("express").Router();
const {
    postImage,
    approve,
    like,
    deleteImage,
    getImage,
    getNotApprovedImages,
    getImages,
    getLikedImages, getExcelFile, getRunCount, addRunCount, getGritalkCount, addGritalkCount, updatePost
} = require("../controllers/post")
const {uploadPost} = require("../middleWare/multer");
router.post("/", uploadPost, postImage);
router.put("/", updatePost);
router.delete("/", deleteImage);
router.put("/approval", approve);
router.put("/like", like);
router.get("/", getImages);
router.get("/detail", getImage);
router.get("/disapproval", getNotApprovedImages);
router.get("/like", getLikedImages);
router.get("/excel", getExcelFile);
router.get("/runCount", getRunCount);
router.get("/addCount", addRunCount);
router.get("/gritalkCount", getGritalkCount);
router.get("/addGritalkCount",addGritalkCount)


module.exports = router;

const router = require("express").Router();
const {
    postImage,
    approve,
    like,
    deleteImage,
    getImage,
    getNotApprovedImages,
    getImages,
    getLikedImages
} = require("../controllers/post")
const {uploadPost} = require("../middleWare/multer");
router.post("/", uploadPost, postImage);
router.delete("/",  deleteImage);
router.put("/approval",  approve);
router.put("/like",  like);
router.get("/",  getImages);
router.get("/detail",  getImage);
router.get("/disapproval",  getNotApprovedImages);
router.get("/like",  getLikedImages);
module.exports = router;

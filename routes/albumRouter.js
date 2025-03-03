const express = require("express");
const router = express.Router();
const authenticate = require("./authenticate");
const albumController = require("../controllers/albumController");

router.get("/", albumController.getIndex);
router.get("/artists/:artist/:album", albumController.getAlbum);
router.get(
    "/artists/:artist/update/:album",
    authenticate,
    albumController.updateAlbumGet
);
router.put("/artists/:artist/:album", albumController.updateAlbumPut); // 更新專輯
router.delete(
    "/artists/:artist/:album",
    authenticate,
    albumController.deleteAlbum
); // 刪除專輯
router.get("/genres/:genre", albumController.getGenreAlbums); // 修改路由，防止與 "/:artist" 衝突
router.get("/artists/:artist", albumController.getArtistAlbums); // 修改路由，防止與 "/:artist/:album" 衝突
router.get("/artists", albumController.getArtists);
router.get("/genres", albumController.getGenres);
router.get("/create", authenticate, albumController.getCreatePage);
router.post("/create", albumController.insertAlbumPost);

module.exports = router;

const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

router.get("/", albumController.getIndex);
router.get("/artists", albumController.getArtists);
router.get("/genres", albumController.getGenres);
router.get("/:genre", albumController.getGenreAlbums);
router.get("/:artist", albumController.getArtistAlbums);
router.get("/:artist/:album", albumController.getAlbum);
router.get("/:artist/:album", albumController.updateAlbumGet);
router.put("/:artist/:album", albumController.updateAlbum); // 更新專輯
router.delete("/:artist/:album", albumController.deleteAlbum); // 刪除專輯
router.get("/create", albumController.getCreatePage);
router.post("/create", albumController.insertAlbum);

module.exports = router;

const db = require("../db/queries");

async function getIndex(req, res) {
    const albums = await db.getAll();
    res.render("index", { title: "Albums", albums: albums });
}

async function getArtists(req, res) {
    const albums = await db.getArtists();
    res.render("category", { title: "Artists", albums: albums });
}

async function getGenres(req, res) {
    const albums = await db.getGenres();
    res.render("category", { title: "Genres", albums: albums });
}

async function getGenreAlbums(req, res) {
    const genre = req.params.genre;
    const albums = await db.getGenre(genre);
    res.render("category", { title: genre, albums: albums });
}

async function getArtistAlbums(req, res) {
    const artist = req.params.artist;
    const albums = await db.getArtist(artist);
    res.render("category", { title: artist, albums: albums });
}

async function getAlbum(req, res) {
    const album = req.params.album;
    const albums = await db.getAlbum(album);
    res.render("album", { title: album, albums: albums });
}

async function updateAlbumGet(req, res) {
    const id = req.params.id;
    const albums = await db.getAlbumByID(id);
    res.render("createAlbum", {
        title: "Editing" + albums.album,
        album: albums.album,
    });
}

async function updateAlbumPut(req, res) {
    const updateAlbum = {
        album: req.body.album,
        genre: req.body.genre,
        artist: req.body.artist,
        songs: req.body.songs,
        cover: req.body.cover,
    };
    await db.updateAlbum(updateAlbum);
    res.render("album", { title: updateAlbum.album, albums: updateAlbum });
}

async function deleteAlbum(req, res) {
    const id = req.params.id;
    await db.deleteAlbum(id);
    res.redirect("/");
}

async function getCreatePage(req, res) {
    res.render("createAlbum");
}

async function insertAlbumPost(req, res) {
    const newAlbum = {
        album: req.body.album,
        genre: req.body.genre,
        artist: req.body.artist,
        songs: req.body.songs,
        cover: req.body.cover,
    };
    await db.insertAlbum(newAlbum);
    res.redirect("/");
}

module.exports = {
    getIndex,
    getArtists,
    getGenres,
    getGenreAlbums,
    getArtistAlbums,
    getAlbum,
    updateAlbumGet,
    updateAlbumPut,
    deleteAlbum,
    getCreatePage,
    insertAlbumPost,
};

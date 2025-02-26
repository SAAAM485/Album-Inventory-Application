const pool = require("./pool");

async function getAll() {
    const { rows } = await pool.query(
        "SELECT * FROM albums ORDER BY album, artist"
    );
    return rows;
}

async function getGenres() {
    const { rows } = await pool.query(
        `SELECT DISTINCT ON (genre) genre, album, artist, songs, cover 
         FROM albums 
         ORDER BY genre, album`
    );
    return rows;
}

async function getGenre(genre) {
    const { rows } = await pool.query(
        "SELECT * FROM albums WHERE genre = $1 ORDER BY album",
        [genre]
    );
    return rows;
}

async function getArtists() {
    const { rows } = await pool.query(
        `SELECT DISTINCT ON (artist) artist, album, genre, songs, cover 
         FROM albums 
         ORDER BY artist, album`
    );
    return rows;
}

async function getArtist(artist) {
    const { rows } = await pool.query(
        "SELECT * FROM albums WHERE artist = $1 ORDER BY album",
        [artist]
    );
    return rows;
}

async function getAlbum(album) {
    const { rows } = await pool.query("SELECT * FROM albums WHERE album = $1", [
        album,
    ]);
    return rows[0];
}

async function getAlbumByID(id) {
    const { rows } = await pool.query("SELECT * FROM albums WHERE id = $1", [
        id,
    ]);
    return rows[0];
}

async function updateAlbum(updateAlbum) {
    try {
        const target = await getAlbumByID(updateAlbum.id);
        if (!target) {
            throw new Error("Album not found");
        }
        await pool.query(
            `
            UPDATE albums
            SET album = $1, genre = $2, artist = $3, songs = $4, cover = $5
            WHERE id = $6
            `,
            [
                updateAlbum.album,
                updateAlbum.genre,
                updateAlbum.artist,
                updateAlbum.songs,
                updateAlbum.cover,
                updateAlbum.id,
            ]
        );
    } catch (error) {
        console.error("Error updating album:", error);
        throw error;
    }
}

async function deleteAlbum(album) {
    await pool.query("DELETE FROM albums WHERE album = $1", [album]);
}

async function insertAlbum(newAlbum) {
    await pool.query(
        "INSERT INTO albums (album, genre, artist, songs, cover) VALUES ($1, $2, $3, $4, $5)",
        [
            newAlbum.album,
            newAlbum.genre,
            newAlbum.artist,
            newAlbum.songs,
            newAlbum.cover,
        ]
    );
}

module.exports = {
    getAll,
    getGenres,
    getGenre,
    getArtists,
    getArtist,
    getAlbum,
    getAlbumByID,
    updateAlbum,
    deleteAlbum,
    insertAlbum,
};

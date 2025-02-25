require("dotenv").config();
const { Client } = require("pg");

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    album TEXT,
    genre TEXT,
    artist TEXT,
    songs TEXT,
    cover TEXT
);`;

const SQL_CHECK_EXISTENCE = `
SELECT COUNT(*) FROM albums
WHERE album = $1 AND genre = $2 AND artist = $3 AND songs = $4 AND cover = $5;`;

const SQL_INSERT_ALBUM = `
INSERT INTO albums (album, genre, artist, songs, cover)
VALUES ($1, $2, $3, $4, $5);`;

const ALBUMS = [
    {
        album: "Fluorescent",
        genre: "Metalcore",
        artist: "Life Awaits",
        songs: "1. Fluorescent\n2. Digging in the Sands\n3. Blind Belief\n4. Captivated\n5. Disconnect\n6. Undiscovered Frequencies\n7. Everlast (ft Akin)\n8. Heart of Fates\n9. Ink\n10. Better now",
        cover: "https://m.media-amazon.com/images/I/813hEjAdUGL.jpg",
    },
    {
        album: "Call Me Insane",
        genre: "Metalcore",
        artist: "Life Awaits",
        songs: "1. In Gloom\n2. New World Sanity\n3. Only Paranoid\n4. Renegades\n5. Dead End\n6. Unchained\n7. 祝融\n8. The Passenger\n9. Devour Me\n10. All In My Head\n11. I'm Still Trying, At Least",
        cover: "https://m.media-amazon.com/images/I/719sqP-mjfL.jpg",
    },
    {
        album: "Awakened",
        genre: "Metalcore",
        artist: "As I Lay Dying",
        songs: "1. Cauterize\n2. A Greater Foundation\n3. Resilience\n4. Wasted Words\n5. Whispering Silence\n6. Overcome\n7. No Lungs to Breathe\n8. Defender\n9. Washed Away\n10. My Only Home\n11. Tear Out My Eyes",
        cover: "https://m.media-amazon.com/images/I/81+tASyeY0L.jpg",
    },
    {
        album: "Shaped By Fire",
        genre: "Metalcore",
        artist: "As I Lay Dying",
        songs: "1. Burn to Emerge\n2. Blinded\n3. Shaped by Fire\n4. Undertow\n5. Torn Between\n6. Gatekeeper\n7. The Wreckage\n8. My Own Grave\n9. Take What's Left\n10. Redefined\n11. Only After We've Fallen\n12. The Toll It Takes",
        cover: "https://m.media-amazon.com/images/I/91-d52XPVaL.jpg",
    },
    {
        album: "strobo",
        genre: "J-Pop",
        artist: "Vaundy",
        songs: "1. Audio 001\n2. 灯火 (Tomoshibi)\n3. 東京フラッシュ (Tokyo Flash)\n4. 怪獣の花唄 (Kaijuu No Hanauta)\n5. Life Hack\n6. 不可幸力 (Fukakouryoku)\n7. soramimi\n8. Audio 002\n9. napori\n10. 僕は今日も (Boku wa Kyou mo)\n11. Bye by Me",
        cover: "https://m.media-amazon.com/images/I/51mWn4317YL.jpg",
    },
    {
        album: "THE BOOK",
        genre: "J-Pop",
        artist: "YOASOBI",
        songs: "1. Epilogue\n2. アンコール (Encore)\n3. ハルジオン (Harujion)\n4. あの夢をなぞって (Ano Yume o Nazotte)\n5. たぶん (Tabun)\n6. 群青 (Gunjou)\n7. ハルカ (Haruka)\n8. 夜に駆ける (Yoru ni Kakeru)\n9. Prologue",
        cover: "https://m.media-amazon.com/images/I/61d-OYJmHwL.jpg",
    },
    {
        album: "狂言",
        genre: "J-Pop",
        artist: "Ado",
        songs: "1. レディメイド\n2. 踊\n3. 家庭暴力\n4. FREEDOM\n5. 煙火\n6. 藍唇\n7. 踊り子\n8. ギラギラ\n9. 小阿修羅\n10. 謎のオネエ\n11. うっせぇわ\n12. マザーランド\n13. 過度学習\n14. 夜のピエロ",
        cover: "https://m.media-amazon.com/images/I/71oUVIRh9LL.jpg",
    },
    {
        album: "Ascendancy",
        genre: "Metalcore",
        artist: "Trivium",
        songs: "1. The End of Everything\n2. Rain\n3. Pull Harder on the Strings of Your Martyr\n4. Drowned and Torn Asunder\n5. Ascendancy\n6. A Gunshot to the Head of Trepidation\n7. Like Light to the Flies\n8. Dying in Your Arms\n9. The Deceived\n10. Suffocating Sight\n11. Departure\n12. Declaration",
        cover: "https://m.media-amazon.com/images/I/71dLrGCHF0L.jpg",
    },
    {
        album: "In Waves",
        genre: "Metalcore",
        artist: "Trivium",
        songs: "1. Capsizing The Sea\n2. In Waves\n3. Inception Of The End\n4. Dusk Dismantled\n5. Watch The World Burn\n6. Black\n7. A Skyline's Severance\n8. Ensnare The Sun\n9. Built To Fall\n10. Caustic Are The Ties That Bind\n11. Forsake Not The Dream\n12. Drowning In Slow Motion",
        cover: "https://m.media-amazon.com/images/I/71gbzvz9rfL.jpg",
    },
    {
        album: "The Sin and the Sentence",
        genre: "Metalcore",
        artist: "Trivium",
        songs: "1. The Sin And The Sentence\n2. Beyond Oblivion\n3. Other Worlds\n4. The Heart From Your Hate\n5. Betrayer\n6. The Wretchedness Inside\n7. Endless Night\n8. Sever The Hand\n9. Beauty In The Sorrow\n10. The Revanchist\n11. Thrown Into The Fire",
        cover: "https://m.media-amazon.com/images/I/51o5j43ESoL.jpg",
    },
];

async function main() {
    console.log("Seeding...");
    const client = new Client({
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.password,
        port: process.env.port,
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.sslrootcert, // 使用 .env 文件中的 SSL 憑證
        },
        sslmode: process.env.sslmode, // 明確使用 .env 文件中的 sslmode 參數
    });
    await client.connect();
    await client.query(SQL_CREATE_TABLE);

    for (const defaultAlbum of ALBUMS) {
        const res = await client.query(SQL_CHECK_EXISTENCE, [
            defaultAlbum.album,
            defaultAlbum.genre,
            defaultAlbum.artist,
            defaultAlbum.songs,
            defaultAlbum.cover,
        ]);
        if (parseInt(res.rows[0].count, 10) === 0) {
            await client.query(SQL_INSERT_ALBUM, [
                defaultAlbum.album,
                defaultAlbum.genre,
                defaultAlbum.artist,
                defaultAlbum.songs,
                defaultAlbum.cover,
            ]);
        }
    }

    await client.end();
    console.log("Done");
}

main().catch((err) => console.error("Error executing script", err));

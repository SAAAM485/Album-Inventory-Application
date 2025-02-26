const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const albumRouter = require("./routes/albumRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // 確保這一行存在
app.use("/", albumRouter);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});

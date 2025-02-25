const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT || 3000;
const albumRouter = require("./routes/albumRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/", albumRouter);

app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}/`);
});

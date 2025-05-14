const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const publicRoutes = require("./routes/public");
const quotesRoutes = require("./routes/quotes");
const userRoutes = require("./routes/user");

// SETTERS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));

// EXPRESS USES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use(publicRoutes);
app.use(quotesRoutes);
app.use(userRoutes);
sequelize
  .sync()
  .then((result) => {
    // SERVER RUNNING

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}!`)
    );
  })
  .catch((error) => console.log(error));

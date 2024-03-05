const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

// Database Connection ....

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/files")));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// make Directory

try {
  const path = "./public/files";

  fs.access(path, (error) => {
    // To check if given directory
    // already exists or not
    if (error) {
      // If current directory does not exist then create it
      fs.mkdir(path, { recursive: true }, (error) => {
        if (error) {
          console.log(error);
        }
        //  else {
        //   console.log("New Directory created successfully !!");
        // }
      });
    }
    // else {
    //   console.log("Given Directory already exists !!");
    // }
  });
} catch (err) {
  console.error(err);
}

app.use("/public/files", express.static("public/files"));

// Require routes
const authRoutes = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const Catagory = require("./routes/Catagory.routes");
const testimonial = require("./routes/testimonial.routes");
const FAQ = require("./routes/FAQ.routes");
const Feel = require("./routes/feel.routes");
const Style = require("./routes/style.routes");
const product = require("./routes/product.routes");
const HomeCategory = require("./routes/home-category.routes");
const Home = require("./routes/home.routes");
const userFavoritProduct = require("./routes/userFavoriteProduct.routes");
const userMoodboard = require("./routes/userMoodboard.routes");
const rating = require("./routes/rating.routes");
const showInterest = require("./routes/showInterest.routes");
const connectToDesigner = require("./routes/connectToDesigner.routes");
const feedback = require("./routes/feedback.routes");

// path setting for using Rout

app.use("/api/v2", [
  authRoutes,
  user,
  Catagory,
  testimonial,
  Feel,
  Style,
  FAQ,
  product,
  HomeCategory,
  Home,
  userFavoritProduct,
  userMoodboard,
  rating,
  showInterest,
  connectToDesigner,
  feedback,
]);

// Healt Check
app.use("/health", (req, res) => {
  res.send("Working...");
});
// serever part start....
var port = process.env.PORT;

app.listen(port, () => {
  console.log(`your server start at http://localhost:${port}`);
});

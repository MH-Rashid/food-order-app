require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const logger = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials.js");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./dbconfig.js");
const PORT = process.env.PORT || 3100;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle credentials check before CORS
app.use(credentials);

// Third party middleware to handle CORS
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// built-in middleware to serve static files
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/api", routes);

// Route handler for 404 Not Found
app.all(/^.*$/, (req, res) => {
  res.sendStatus(404);
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

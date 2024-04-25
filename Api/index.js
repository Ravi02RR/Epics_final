require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db.js");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/Contact.js");
const areaRoutes = require("./routes/route.areas.js");
const comment = require('./routes/route.comment.js')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", areaRoutes);
app.use('/api', comment)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

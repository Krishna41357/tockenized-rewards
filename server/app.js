const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGO_URI } = require("./config");

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // Adjust to your frontend URL

app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/courses", require("./routes/courses"));
app.use("/rewards", require("./routes/rewards"));

app.listen(5000, () => console.log("Server running on port 5000"));

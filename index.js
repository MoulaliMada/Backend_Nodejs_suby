const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const venderRoutes = require("./routes/vendorRoutes");
const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const path = require("path");

dotEnv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose connected successfully"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from your frontend
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
//   })
// );
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use("/vendor", venderRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));
//app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

app.use("/hh", (req, res) => {
  res.send("welcom");
});

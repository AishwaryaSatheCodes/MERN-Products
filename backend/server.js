import express from "express"; // const express = require('express');
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());
dotenv.config();
import productRoutes from "./routes/product.route.js";
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at... 5000");
});

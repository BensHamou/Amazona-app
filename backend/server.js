import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import path from "path";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(
    process.env.PAYPAL_CLIENT_ID ||
      "Ac8FeOx9FdKIzRxW0e1v1KAp8BDqWhdXq28GN-lJP5LvdFSdH5RDp6RtNsJ0dyR6-9SUm3RKFWJ5kXh6b"
  );
});

app.get("/api/config/google", (req, res) => {
  res.send(
    process.env.GOOGLE_API_KEY || "AIzaSyDAWSAKqthLIubk6-KPtU-mBESi9UnB36k"
  );
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});

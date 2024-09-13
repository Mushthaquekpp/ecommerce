import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongodb from "./db.js";
import route from "./Routes/AuthRoute.js";
import categoryRoute from "./Routes/CategoryRoute.js";
import adminRoute from "./Routes/adminRoute.js";
import productRoute from "./Routes/ProductRoute.js";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(bodyParser.json());

mongodb();

app.use("/api/v1/auth", route);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/admin", adminRoute);
app.listen(process.env.PORT, () => {
  console.log(`port running on ${process.env.PORT}`);
});

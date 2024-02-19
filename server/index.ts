import express from "express";
import { json } from "body-parser";
import connectdb from "./db/connection";
import ENV from "./utils/env";
import userRoutes from "./routes/user";
import movieRoutes from "./routes/movie";
import AuthController from "./controllers/authController";

if (ENV.DATABASE_URL === undefined) {
  throw new Error("Database is not configured");
}
connectdb(ENV.DATABASE_URL);

const app = express();
app.use(json({ limit: "5mb" }));

const server = app.listen(3001, () => {
  console.log("Server is listening");
});

app.use("/user", userRoutes);
app.use("/movies", AuthController.authChecker, movieRoutes);

process.on("unhandledRejection", (err: any) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

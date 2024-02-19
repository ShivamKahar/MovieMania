import express from "express";
import MovieController from "../controllers/movieController";

const router = express.Router();

// Get List
router.get("/", MovieController.getMovies);
// Get Movie by id
router.get("/:movieId", MovieController.getMovie);
// Create Movie
router.post("/", MovieController.createMovie);
// Update Movie
router.put("/:movieId", MovieController.updateMovie);
// Delete Movie
router.delete("/:movieId", MovieController.deleteMovie);

export default router;

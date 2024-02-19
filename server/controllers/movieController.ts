import { Request, Response } from "express";
import Movie from "../db/models/movie";
import {
  ErrorResponse,
  ResponseType,
  SuccessResponse,
} from "../utils/response";
import { MovieType, ProtectedRouteLocals, UserType } from "./types";

class MovieController {
  static getMovies = async (
    req: Request,
    res: Response<ResponseType<MovieType[]>, ProtectedRouteLocals>
  ) => {
    try {
      const movies = (await Movie.find({ userId: res.locals.user.id })).map(
        (movie) => ({
          id: movie.id,
          title: movie.title,
          publishedYear: movie.publishedYear,
          poster: movie.poster,
        })
      );
      res.status(200).json(SuccessResponse(movies));
    } catch (error: any) {
      if (error?.message) {
        res.status(500).json(ErrorResponse(error.message));
      } else {
        res.status(500).json(ErrorResponse("Something went wrong"));
      }
    }
  };

  static getMovie = async (
    req: Request,
    res: Response<ResponseType<MovieType>, ProtectedRouteLocals>
  ) => {
    try {
      const movie = await Movie.findOne({ _id: req.params.movieId });
      if (!movie) {
        throw new Error("No movie found with this id");
      }
      res.status(200).json(
        SuccessResponse({
          id: movie.id,
          title: movie.title,
          publishedYear: movie.publishedYear,
          poster: movie.poster,
        })
      );
    } catch (error: any) {
      if (error?.message) {
        res.status(500).json(ErrorResponse(error.message));
      } else {
        res.status(500).json(ErrorResponse("Something went wrong"));
      }
    }
  };

  static createMovie = async (
    req: Request,
    res: Response<{}, ProtectedRouteLocals>
  ) => {
    try {
      if (!req.body.title || !req.body.publishedYear) {
        throw new Error("Invalid parameters");
      }
      const movie = new Movie({
        title: req.body.title,
        poster: req.body.poster,
        publishedYear: req.body.publishedYear,
        userId: res.locals.user.id,
      });
      await movie.save();
      res.status(200).json(
        SuccessResponse({
          id: movie.id,
        })
      );
    } catch (error: any) {
      if (error?.message) {
        res.status(500).json(ErrorResponse(error.message));
      } else {
        res.status(500).json(ErrorResponse("Something went wrong"));
      }
    }
  };

  static updateMovie = async (req: Request, res: Response) => {
    try {
      const movie = await Movie.findById(req.params.movieId);
      if (!movie) throw new Error("No movie found with this id");

      if (req.body.title) movie.title = req.body.title;
      if (req.body.publishedYear) movie.publishedYear = req.body.publishedYear;
      if (req.body.poster) movie.poster = req.body.poster;

      await movie.save();

      res.status(200).json(
        SuccessResponse({
          id: movie.id,
        })
      );
    } catch (error: any) {
      if (error?.message) {
        res.status(500).json(ErrorResponse(error.message));
      } else {
        res.status(500).json(ErrorResponse("Something went wrong"));
      }
    }
  };

  static deleteMovie = async (req: Request, res: Response) => {
    try {
      await Movie.deleteOne({ _id: req.params.movieId }).exec();

      res.status(200).json(
        SuccessResponse({
          id: req.params.movieId,
        })
      );
    } catch (error: any) {
      if (error?.message) {
        res.status(500).json(ErrorResponse(error.message));
      } else {
        res.status(500).json(ErrorResponse("Something went wrong"));
      }
    }
  };
}

export default MovieController;

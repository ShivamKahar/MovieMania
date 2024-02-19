import { useHistory } from "react-router-dom";
import { MovieType } from "../../api/movie";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/movies/${movie.id}/edit`)}
      className="block cursor-pointer w-full p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover:bg-gray-700 "
    >
      <img
        className="aspect-video mb-2 w-full"
        src={movie.poster}
        alt={movie.title}
      ></img>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {movie.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Published Year: <b>{movie.publishedYear}</b>
      </p>
    </div>
  );
};

export default MovieCard;

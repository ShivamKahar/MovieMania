import { useHistory } from "react-router-dom";
import { useGetMovies } from "../api/movie";
import MovieCard from "../components/Movie/MovieCard";

function HomePage() {
  const history = useHistory();
  const { data, isPending } = useGetMovies();

  const handleAddMovie = () => history.push("/movies/new");
  return (
    <div className={"px-4"}>
      {isPending ? (
        <p className="text-center text-lg">Loading...</p>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {data.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>
            You dont have any movies right now, Click on Add Movies to get
            started
          </p>
          <button
            type={"button"}
            onClick={handleAddMovie}
            className="text-white mt-3 bg-primary hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Add Movie
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;

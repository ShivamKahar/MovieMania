import { Link, useHistory } from "react-router-dom";
import { removeCookie } from "typescript-cookie";

function HomeContainer({ children }: { children: React.ReactElement }) {
  const history = useHistory();

  const handleLogout = () => {
    removeCookie("session_id");
    history.push("/signin");
  };

  const handleAddMovie = () => {
    history.push("/movies/new");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <div className="max-w-screen-xl w-full mx-auto px-4 py-2 flex items-center justify-between">
          <div>
            <Link to={"/"}>
              <span className="text-2xl font-semibold">Movie Mania</span>
            </Link>
          </div>
          <div>
            <button
              type={"button"}
              onClick={handleAddMovie}
              className="text-white bg-transparent hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm py-2 px-4"
            >
              + Add Movie
            </button>
            <button
              type={"button"}
              onClick={handleLogout}
              className="text-white bg-transparent hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-400 font-medium rounded-full text-sm py-2 px-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex-1">{children}</div>
    </div>
  );
}

export default HomeContainer;

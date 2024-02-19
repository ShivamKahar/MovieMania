import { useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDeleteMovie, useGetMovieById, useUpdateMovie } from "../api/movie";
import { useEffect, useMemo } from "react";
import { convertFileToBase64 } from "../utils/genericFunctions";
import { toast } from "react-toastify";

type FormFields = {
  title: string;
  publishedYear: string;
  poster: File[];
  image: string;
};

function EditMoviePage() {
  const history = useHistory();
  const { id: movieId } = useParams<{ id: string }>();
  const { data } = useGetMovieById(movieId);
  const editMovieMutation = useUpdateMovie(movieId);
  const deleteMovieMutation = useDeleteMovie();
  const { register, handleSubmit, watch, reset } = useForm<FormFields>({});

  const selectedImage = watch("poster")?.[0];
  const currentImage = selectedImage
    ? window.URL.createObjectURL(selectedImage)
    : "";

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const poster = data.poster[0]
      ? await convertFileToBase64(data.poster[0])
      : "";
    editMovieMutation.mutate(
      {
        title: data.title,
        publishedYear: data.publishedYear,
        poster,
      },
      {
        onSuccess: () => {
          toast("Movie Updated", { type: "success" });
          history.push("/movies");
        },
      }
    );
  };

  const handleDeleteMovie = () => {
    deleteMovieMutation.mutate(
      { id: movieId },
      {
        onSuccess: () => {
          toast("Movie Deleted", { type: "success" });
          history.push("/movies");
        },
      }
    );
  };

  const yearRange = useMemo(() => {
    const retData: string[] = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      retData.push(year.toString());
    }
    return retData;
  }, []);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        image: data.poster,
        publishedYear: data.publishedYear,
      });
    }
  }, [data, reset]);

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-sm flex-1">
        <h1 className="text-3xl bold mb-5 text-center">Edit Movie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title", { value: data?.title })}
            type="text"
            placeholder="Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            required
          />
          <select
            {...register("publishedYear", { value: data?.publishedYear })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            required
          >
            {yearRange.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <label
            className="mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Change Image
          </label>
          <input
            id="file_input"
            className="mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            {...register("poster")}
            type="file"
            accept="image/*"
          ></input>
          <img
            className="aspect-video mb-2 w-full"
            src={currentImage || data?.poster}
            alt={data?.title}
          ></img>
          {editMovieMutation.error && (
            <p className="text-base text-red-600 mb-2">
              {editMovieMutation.error.message}
            </p>
          )}
          <Button type="submit" title="Update" />
          <Button
            type="button"
            title="Delete"
            onClick={handleDeleteMovie}
            disable={editMovieMutation.isPending}
          />
          <Button
            type="button"
            title="Cancel"
            onClick={() => history.push("/movies")}
            disable={editMovieMutation.isPending}
          />
        </form>
      </div>
    </div>
  );
}

export default EditMoviePage;

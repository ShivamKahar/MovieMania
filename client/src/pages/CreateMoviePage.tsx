import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateMovie } from "../api/movie";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { convertFileToBase64 } from "../utils/genericFunctions";

type FormFields = {
  title: string;
  publishedYear: string;
  poster: File[];
};

function CreateMoviePage() {
  const history = useHistory();
  const createMovieMutation = useCreateMovie();
  const { register, handleSubmit, watch } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const poster = data.poster[0]
      ? await convertFileToBase64(data.poster[0])
      : "";
    createMovieMutation.mutate({
      title: data.title,
      publishedYear: data.publishedYear,
      poster,
    });
    toast("Movie added successfully!", { type: "success" });
    history.push("/movies");
  };

  const selectedImage = watch("poster")?.[0];
  const currentImage = selectedImage
    ? window.URL.createObjectURL(selectedImage)
    : "";

  const yearRange = useMemo(() => {
    const retData: string[] = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      retData.push(year.toString());
    }
    return retData;
  }, []);

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-sm flex-1">
        <h1 className="text-3xl bold mb-5 text-center">Add Movie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            required
          />
          <select
            {...register("publishedYear")}
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
            Add Image
          </label>
          <input
            id="file_input"
            className="mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            {...register("poster")}
            type="file"
            accept="image/*"
            required
          ></input>
          {currentImage && (
            <img className="aspect-video mb-2 w-full" src={currentImage}></img>
          )}
          {createMovieMutation.error && (
            <p className="text-base text-red-600 mb-2">
              {createMovieMutation.error.message}
            </p>
          )}
          <Button type="submit" title="Save" />
          <Button
            type="button"
            title="Cancel"
            onClick={() => history.push("/movies")}
          />
        </form>
      </div>
    </div>
  );
}

export default CreateMoviePage;

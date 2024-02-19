import { useMutation, useQuery } from "@tanstack/react-query";
import { RestRequest } from "./apiServices";

export type MovieType = {
  id: string;
  title: string;
  poster: string;
  publishedYear: string;
};

export const GetMovies = async (): Promise<MovieType[]> => {
  const response = await RestRequest<MovieType[]>(
    "movies",
    undefined,
    "GET",
    "text/html"
  );
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export const GetMovie = async (id: string): Promise<MovieType> => {
  const response = await RestRequest<MovieType>(
    `movies/${id}`,
    undefined,
    "GET",
    "text/html"
  );
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export const CreateMovie = async (
  movie: Omit<MovieType, "id">
): Promise<Pick<MovieType, "id">> => {
  const response = await RestRequest<Pick<MovieType, "id">>(
    "movies",
    movie,
    "POST",
    "application/json"
  );
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export const UpdateMovie = async (
  id: string,
  movie: Partial<MovieType>
): Promise<Pick<MovieType, "id">> => {
  const response = await RestRequest<Pick<MovieType, "id">>(
    `movies/${id}`,
    movie,
    "PUT",
    "application/json"
  );
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export const DeleteMovie = async (
  id: string
): Promise<Pick<MovieType, "id">> => {
  const response = await RestRequest<Pick<MovieType, "id">>(
    `movies/${id}`,
    undefined,
    "DELETE",
    "application/json"
  );
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export const useGetMovies = () => {
  const query = useQuery({
    queryKey: ["GetMovies"],
    queryFn: () => GetMovies(),
  });

  return query;
};

export const useGetMovieById = (id: string) => {
  const query = useQuery({
    queryKey: ["GetMovie", id],
    queryFn: () => GetMovie(id),
  });

  return query;
};

export const useCreateMovie = () => {
  const mutation = useMutation<{ id: string }, Error, Omit<MovieType, "id">>({
    mutationKey: ["CreateMovie"],
    mutationFn: (values) => CreateMovie(values),
  });

  return mutation;
};

export const useUpdateMovie = (id: string) => {
  const mutation = useMutation<{ id: string }, Error, Partial<MovieType>>({
    mutationKey: ["UpdateMovie", id],
    mutationFn: (values) => UpdateMovie(id, values),
  });

  return mutation;
};

export const useDeleteMovie = () => {
  const mutation = useMutation<{ id: string }, Error, { id: string }>({
    mutationKey: ["DeleteMovie"],
    mutationFn: (values) => DeleteMovie(values.id),
  });

  return mutation;
};

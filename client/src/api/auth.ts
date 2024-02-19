import { useMutation } from "@tanstack/react-query";
import { RestRequest } from "./apiServices";
import { setCookie } from "typescript-cookie";
import { useHistory } from "react-router-dom";

export type UserType = {
  id: string;
  userName: string;
  email: string;
  token: string;
};

export const Login = async (
  email: string,
  password: string
): Promise<UserType> => {
  const response = await RestRequest<UserType>(
    "user/signin",
    { email, password },
    "POST",
    "application/json"
  );
  if (!response.success) {
    throw new Error(response.error);
  }
  setCookie("session_id", response.data.token);
  return response.data;
};

export const Register = async (
  userName: string,
  email: string,
  password: string
): Promise<UserType> => {
  const response = await RestRequest<UserType>(
    "user/signup",
    { email, password, userName },
    "POST",
    "application/json"
  );
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
};

export default function useAuthenticate() {
  const history = useHistory();
  const loginMutation = useMutation<
    UserType,
    Error,
    { email: string; password: string }
  >({
    mutationKey: ["SignIn"],
    mutationFn: async (values) => Login(values.email, values.password),
    onSuccess: () => {
      history.push("/movies");
    },
  });
  const registerMutation = useMutation<
    UserType,
    Error,
    { userName: string; email: string; password: string }
  >({
    mutationKey: ["SignUp"],
    mutationFn: async (values) =>
      Register(values.userName, values.email, values.password),
    onSuccess: () => {
      history.push("/signin");
    },
  });

  return { loginMutation, registerMutation };
}

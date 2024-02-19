import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import useAuthenticate from "../api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormFields = {
  email: string;
  password: string;
};
function LoginPage() {
  const history = useHistory();
  const { register, handleSubmit } = useForm<FormFields>();
  const { loginMutation } = useAuthenticate();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast("Login Successful", { type: "success" });
      },
    });
  };
  return (
    <div className="text-center">
      <h1 className="text-3xl bold mb-5">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="text"
          placeholder="Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          required
        />
        {loginMutation.error && (
          <p className="text-base text-red-600 mb-2">
            {loginMutation.error.message}
          </p>
        )}
        <Button
          type="submit"
          title="Sign In"
          disable={loginMutation.isPending}
        />
        <Button
          type="button"
          title="Register Now"
          onClick={() => history.push("/signup")}
        />
      </form>
    </div>
  );
}

export default LoginPage;

import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuthenticate from "../api/auth";
import { toast } from "react-toastify";

type FormFields = {
  email: string;
  userName: string;
  password: string;
};

function RegisterPage() {
  const history = useHistory();
  const { register, handleSubmit } = useForm<FormFields>();
  const { registerMutation } = useAuthenticate();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast("Resgistration Successful, Please login to continue", {
          type: "success",
          autoClose: 5000,
        });
      },
    });
  };
  return (
    <div className="text-center">
      <h1 className="text-3xl bold mb-5">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("userName")}
          type="text"
          placeholder="User Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          required
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          required
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          required
        />
        {registerMutation.error && (
          <p className="text-base text-red-600 mb-2">
            {registerMutation.error.message}
          </p>
        )}
        <Button
          type="submit"
          title="Register"
          disable={registerMutation.isPending}
        />
        <Button
          type="button"
          title="Already have an account? Sign In"
          onClick={() => history.push("/signin")}
        />
      </form>
    </div>
  );
}

export default RegisterPage;

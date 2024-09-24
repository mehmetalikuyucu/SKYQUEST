import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiClient, setToken } from "../../api-client/apiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

interface LoginData {
  username: string;
  password: string;
}

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { reset, isPending, mutate } = useMutation({
    mutationFn: (data: LoginData) => apiClient.post("/auth/login", data),
    onSuccess: (response) => {
      setToken(response.data.access_token);
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`, { duration: 5000 });
      reset();
    },
  });

  const onSubmit = async (data: LoginData) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-[#3A6D8C]"
        >
          Username
        </label>
        <div className="relative">
          <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6A9AB0]" />
          <input
            id="username"
            {...register("username", { required: "Username is required" })}
            className="w-full pl-10 pr-3 py-2 border border-[#6A9AB0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A6D8C] bg-white text-[#001F3F]"
            placeholder="Enter your username"
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-[#3A6D8C]"
        >
          Password
        </label>
        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6A9AB0]" />
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full pl-10 pr-3 py-2 border border-[#6A9AB0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A6D8C] bg-white text-[#001F3F]"
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 text-white bg-[#3A6D8C] rounded-md hover:bg-[#001F3F] disabled:bg-[#6A9AB0] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#3A6D8C] focus:ring-offset-2"
      >
        {isPending ? "Logging in..." : "Log In"}
      </button>

      <p className="text-center text-[#3A6D8C]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-[#001F3F] hover:underline focus:outline-none"
        >
          Register
        </button>
      </p>
    </form>
  );
};

export default Login;

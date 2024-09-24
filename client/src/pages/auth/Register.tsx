import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api-client/apiClient";
import toast from "react-hot-toast";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>();

  const mutation = useMutation({
    mutationFn: (data: RegistrationData) => apiClient.post("/users", data),
    onSuccess: () => {
      toast.success("Registration successful");
      onSwitchToLogin();
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
    },
  });

  const onSubmit = (data: RegistrationData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-[#3A6D8C]"
        >
          Email
        </label>
        <div className="relative">
          <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6A9AB0]" />
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full pl-10 pr-3 py-2 border border-[#6A9AB0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A6D8C] bg-white text-[#001F3F]"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
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
        disabled={mutation.isPending}
        className="w-full px-4 py-2 text-white bg-[#3A6D8C] rounded-md hover:bg-[#001F3F] disabled:bg-[#6A9AB0] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#3A6D8C] focus:ring-offset-2"
      >
        {mutation.isPending ? "Registering..." : "Register"}
      </button>

      <p className="text-center text-[#3A6D8C]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#001F3F] hover:underline focus:outline-none"
        >
          Login here
        </button>
      </p>
    </form>
  );
};

export default Register;

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiClient, setToken } from "../api-client/apiClient";
import toast from "react-hot-toast";

interface LoginData {
  username: string;
  password: string;
}

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: LoginData) => apiClient.post("/auth/login", data),
    onSuccess: (response) => {
      setToken(response.data.access_token);
      toast.success("Giriş başarılı");
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      if (error) {
        alert(`Giriş başarısız: ${error || "Bir hata oluştu"}`);
      } else {
        alert("Giriş yapılamadı. Lütfen internet bağlantınızı kontrol edin.");
      }
    },
  });

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1">
          Kullanıcı Adı
        </label>
        <input
          id="username"
          {...register("username", { required: "Kullanıcı adı gerekli" })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1">
          Şifre
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Şifre gerekli" })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      <p className="text-center">
        Hesabınız yok mu?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:underline"
        >
          Kayıt Ol
        </button>
      </p>
    </form>
  );
};

export default Login;

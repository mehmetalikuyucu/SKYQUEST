import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../api-client/apiClient';
import toast from 'react-hot-toast';

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();

  const mutation = useMutation({
    mutationFn: (data: RegistrationData) => apiClient.post("/users", data),
    onSuccess: () => {
      toast.success('Registration successful');
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1">Username</label>
        <input
          id="username"
          {...register('username', { required: 'Username is required' })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      
      <button 
        type="submit" 
        disabled={mutation.isPending}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {mutation.isPending ? 'Registering...' : 'Register'}
      </button>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={onSwitchToLogin} 
          className="text-blue-500 hover:underline"
        >
          Login here
        </button>
      </p>
    </form>
  );
};

export default Register;
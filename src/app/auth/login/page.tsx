'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useFetch from '@/hooks/use-fetch';
import { loginUser } from '@/actions/user';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Cookies  from 'js-cookie';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const { data, fn, loading } = useFetch(loginUser);

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('Logging in with:', data);
    fn(data);
  };
  
  useEffect(() => {
    if (data) {
      if (data.success) {
        Cookies.set("auth-token", data.authToken!, {
          expires: 1,
        });
        toast.success("Logged in", {
          description: data.message,
        });
        router.push("/dashboard");
      } else {
        toast.info("Error", {
          description: data.message,
        });
      }
    }
  }, [data]);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Login to AcadEx</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" {...register('email')} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" {...register('password')} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {loading? "Loading" : "Login"}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account? <span className="text-blue-600 cursor-pointer" onClick={() => router.push('/auth/register')}>Register</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

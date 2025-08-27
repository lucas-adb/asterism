import { Card } from '@/components/ui/card';
import et3D from '@/assets/et-3d.png';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavLink, useNavigate } from 'react-router';
import { useLogin } from '@/hooks/useLogin';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.email().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function LoginPage() {
  const login = useLogin();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleLogin(values: z.infer<typeof formSchema>) {
    login.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        navigate('/favorites');
      },
      onError: (error) => {
        console.error(error);
        toast.error('Login inválido');
      },
    });
  }

  function handleSubmit(values: z.infer<typeof formSchema>) {
    handleLogin(values);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500">
      <div className="px-4 py-8 container mx-auto lg:max-w-[1024px]">
        <Card className="flex flex-row p-0 h-[700px] border-none">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col gap-4 w-full max-w-[250px] sm:max-w-[350px] px-2 sm:px-0">
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl cursor-pointer mb-4">
                  <span className="animate-pulse">✨</span> Asterism
                </h1>
                <h2 className="font-bold text-2xl">Sign in</h2>
                <p className="text-muted-foreground text-sm">
                  Not a member?{' '}
                  {
                    <NavLink
                      className="font-semibold text-foreground"
                      to={'/signup'}
                    >
                      sign up
                    </NavLink>
                  }
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col gap-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="asterism@email.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your password here"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end mt-2">
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div className="flex-1 max-w-[500px] overflow-hidden rounded-r-lg hidden lg:flex">
            <img
              src={et3D}
              alt="image of the mascot et flying through space"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

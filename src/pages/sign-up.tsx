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
import { SignWrapper } from '@/components/common/sign-wrapper';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useSign } from '@/hooks/useSign';
import { useLogin } from '@/hooks/useLogin';

const formSchema = z.object({
  username: z.string().min(2).max(20),
  email: z.email().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function SignUpPage() {
  const { login: authLogin } = useAuth();
  const login = useLogin();
  const sign = useSign();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  function handleSign(values: z.infer<typeof formSchema>) {
    sign.mutate(values, {
      onSuccess: async () => {
        try {
          const loginData = await login.mutateAsync({
            email: values.email,
            password: values.password,
          });

          localStorage.setItem('token', loginData.token);

          authLogin(
            {
              id: loginData.user.id,
              username: loginData.user.username,
              email: loginData.user.email,
            },
            loginData.token
          );

          navigate('/favorites');
        } catch (error) {
          console.error(error);
          toast.error('Error: Can not login after signing');
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error('Sign up error');
      },
    });
  }

  function handleSubmit(values: z.infer<typeof formSchema>) {
    handleSign(values);
    form.reset();
  }

  return (
    <SignWrapper title="Sign Up" text="Already a member?" path="/login">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Invader Zim" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="your password"
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
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </SignWrapper>
  );
}

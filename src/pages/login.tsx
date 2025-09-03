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
import { useNavigate } from 'react-router';
import { useLogin } from '@/hooks/useLogin';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { SignWrapper } from '@/components/common/sign-wrapper';

const formSchema = z.object({
  email: z.email().min(2).max(50),
  password: z.string().min(2).max(50),
});

export function LoginPage() {
  const { login: authLogin } = useAuth();
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

        authLogin(
          {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
          },
          data.token
        );

        navigate('/favorites');
      },
      onError: (error) => {
        console.error(error);
        toast.error('Invalid login');
      },
    });
  }

  function handleSubmit(values: z.infer<typeof formSchema>) {
    handleLogin(values);
    form.reset();
  }

  return (
    <SignWrapper title="Sign In" text="Not a member?" path="/signup">
      <meta
        name="description"
        content="Access your Asterism account to manage your bookmarks. Secure login with email and password."
      />
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
    </SignWrapper>
  );
}

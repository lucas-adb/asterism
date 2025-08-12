import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from './ui/textarea';

interface FavoriteFormProps {
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export type FavoriteFormData = z.infer<typeof formSchema>;

const formSchema = z.object({
  title: z.string().min(2).max(50),
  url: z
    .string()
    .min(1)
    .transform((value) => {
      const trimmed = value.trim();
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
      }
      return `https://${trimmed}`;
    })
    .pipe(z.url()),
  description: z.string().min(2).max(120),
  type: z.enum(['articles', 'inspiration', 'sites', 'tutorials']),
  tags: z.array(z.string().min(1)).min(1),
});

export function FavoriteForm({
  defaultValues = {
    title: '',
    url: '',
    description: '',
    type: 'sites',
    tags: [],
  },
  onSubmit,
}: FavoriteFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="write the title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="write the url here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write the description here..."
                  maxLength={120}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sites">Sites</SelectItem>
                  <SelectItem value="tutorials">Tutorials</SelectItem>
                  <SelectItem value="articles">Articles</SelectItem>
                  <SelectItem value="inspiration">Inspiration</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="tag 1, tag 2, tag 3..."
                  {...field}
                  value={field.value.join(', ')}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(',').map((tag) => tag.trim())
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-2">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}

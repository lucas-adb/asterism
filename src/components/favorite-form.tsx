import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
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
import {
  favoriteFormSchema,
  type FavoriteFormData,
} from '@/schemas/favorite-form-schema';

interface FavoriteFormProps {
  defaultValues?: Partial<FavoriteFormData>;
  onSubmit: (values: FavoriteFormData) => void;
}
export function FavoriteForm({
  defaultValues = {
    title: '',
    url: '',
    description: '',
    type: 'SITES',
    tags: [],
  },
  onSubmit,
}: FavoriteFormProps) {
  const form = useForm<FavoriteFormData>({
    resolver: zodResolver(favoriteFormSchema),
    defaultValues,
  });

  function handleSubmit(values: FavoriteFormData) {
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
                  <SelectItem value="SITES">Sites</SelectItem>
                  <SelectItem value="TUTORIALS">Tutorials</SelectItem>
                  <SelectItem value="ARTICLES">Articles</SelectItem>
                  <SelectItem value="INSPIRATIONS">Inspirations</SelectItem>
                  <SelectItem value="TOOLS">Tools</SelectItem>
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

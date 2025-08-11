import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Favorite } from '@/types/favorite';
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
import { useState } from 'react';
import { PenIcon } from '@phosphor-icons/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditFavoriteDialogProps {
  onEdit: (favorite: Omit<Favorite, 'createdAt'>) => void;
  favorite: Favorite;
}

export function EditFavoriteDialog({
  onEdit,
  favorite,
}: EditFavoriteDialogProps) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    url: z.url(),
    description: z.string().min(2).max(250),
    type: z.enum(['articles', 'inspiration', 'sites', 'tutorials']),
    tags: z.array(z.string().min(1)).min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: favorite.title,
      url: favorite.url,
      description: favorite.description,
      type: favorite.type,
      tags: favorite.tags,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onEdit({
      id: favorite.id,
      ...values,
    });
    setOpen(false);
    form.reset();
  }

  function handleOnOpenChange(isOpen: boolean) {
    setOpen(isOpen);

    if (!isOpen) {
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          variant={'link'}
          className="h-4 w-4 cursor-pointer"
        >
          <PenIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Favorite</DialogTitle>
          <DialogDescription>
            Edit one of your existing favorites.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Input
                      placeholder="write the description here..."
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
      </DialogContent>
    </Dialog>
  );
}

import type { Favorite } from '@/types/favorite';
import { Button } from './ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { PenIcon } from '@phosphor-icons/react';

import { DialogWrapper } from './dialog-wrapper';
import { FavoriteForm, type FavoriteFormData } from './favorite-form';

interface EditFavoriteProps {
  onEdit: (favorite: Omit<Favorite, 'createdAt'>) => void;
  favorite: Favorite;
}

export function EditFavorite({ onEdit, favorite }: EditFavoriteProps) {
  const [open, setOpen] = useState(false);

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

  function handleSubmit(values: FavoriteFormData) {
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
    <DialogWrapper
      open={open}
      onOpenChange={handleOnOpenChange}
      trigger={
        <Button
          size={'icon'}
          variant={'link'}
          className="h-4 w-4 cursor-pointer"
        >
          <PenIcon size={16} />
        </Button>
      }
      title={'Edit Favorite'}
      description={'Edit one of your existing favorites.'}
    >
      <FavoriteForm
        onSubmit={handleSubmit}
        defaultValues={{
          title: favorite.title,
          url: favorite.url,
          description: favorite.description,
          type: favorite.type,
          tags: favorite.tags,
        }}
      />
    </DialogWrapper>
  );
}

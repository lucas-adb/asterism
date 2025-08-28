import type { CreateFavoriteBody, Favorite } from '@/types/favorite';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { PenIcon } from '@phosphor-icons/react';

import { DialogWrapper } from './dialog-wrapper';
import { FavoriteForm } from './favorite-form';
import type { FavoriteFormData } from '@/schemas/favorite-form-schema';
import { favoriteFormSchema } from '@/schemas/favorite-form-schema';

interface EditFavoriteProps {
  onEdit: (id: string, favorite: CreateFavoriteBody) => void;
  favorite: Favorite;
}

export function EditFavorite({ onEdit, favorite }: EditFavoriteProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FavoriteFormData>({
    resolver: zodResolver(favoriteFormSchema),
    defaultValues: {
      title: favorite.title,
      url: favorite.url,
      description: favorite.description,
      type: favorite.type,
      tags: favorite.tags.map((tag) => tag.id),
    },
  });

  function handleSubmit(values: FavoriteFormData) {
    onEdit(favorite.id, { ...values });
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
          tags: favorite.tags.map((tag) => tag.name),
        }}
      />
    </DialogWrapper>
  );
}

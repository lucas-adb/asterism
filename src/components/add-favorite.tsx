import type { FavoriteBody } from '@/types/favorite.types';
import { Button } from './ui/button';
import { useState } from 'react';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { FavoriteForm } from '@/components/forms/favorite-form';
import type { FavoriteFormData } from '@/schemas/favorite.schema';

interface AddFavoriteProps {
  onAdd: (favorite: FavoriteBody) => void;
}

export function AddFavorite({ onAdd }: AddFavoriteProps) {
  const [open, setOpen] = useState(false);

  function handleSubmit(values: FavoriteFormData) {
    onAdd(values);
    setOpen(false);
  }

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      trigger={<Button className="cursor-pointer">Save favorite</Button>}
      title={'Save New Favorite'}
      description={'Please fill all the fields to save a link.'}
    >
      <FavoriteForm onSubmit={handleSubmit} />
    </DialogWrapper>
  );
}

import type { Favorite } from '@/types/favorite';
import { Button } from './ui/button';
import { useState } from 'react';
import { DialogWrapper } from './dialog-wrapper';
import { FavoriteForm, type FavoriteFormData } from './favorite-form';

interface AddFavoriteProps {
  onAdd: (favorite: Omit<Favorite, 'id' | 'createdAt'>) => void;
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

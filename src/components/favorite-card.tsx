import { RocketLaunchIcon, TrashIcon } from '@phosphor-icons/react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import type { CreateFavoriteBody, Favorite } from '@/types/favorite';
import { EditFavorite } from './edit-favorite';

export function FavoriteCard({
  favorite,
  onDelete,
  onEdit,
}: {
  favorite: Favorite;
  onDelete: (id: string) => void;
  onEdit: (id: string, favorite: CreateFavoriteBody) => void;
}) {
  return (
    <Card
      id={favorite.id}
      className="hover:shadow-foreground/20 transition-all duration-300 hover:scale-[1.02] animate-scale-in"
    >
      <CardHeader>
        <CardTitle className="line-clamp-2 pb-0.5" title={favorite.title}>
          {favorite.title}
        </CardTitle>
        <CardDescription
          className="line-clamp-3 cursor-help"
          title={favorite.description}
        >
          {favorite.description}
        </CardDescription>
        <CardAction className="flex gap-2">
          <EditFavorite onEdit={onEdit} favorite={favorite} />
          <Button
            size={'icon'}
            variant={'ghost'}
            className="h-4 w-4 cursor-pointer"
            onClick={() => onDelete(favorite.id)}
          >
            <TrashIcon size={16} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 flex-wrap mt-auto">
          {favorite.tags.map((tag, index) => {
            return (
              <span
                key={`${tag.id}-${index}`}
                className="px-3 py-1 rounded-full inline-flex text-sm bg-foreground text-background"
              >
                {tag.name}
              </span>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex justify-between w-full items-center">
          <p className="text-sm text-muted-foreground">
            {new Date(favorite.created_at).toLocaleDateString()}
          </p>
          <Button className="cursor-pointer" asChild>
            <a href={favorite.url} target="_blank">
              <RocketLaunchIcon size={16} /> Visit
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

import {
  MagnifyingGlassIcon,
  VideoIcon,
  TrashIcon,
  BookIcon,
  LightbulbIcon,
  WrenchIcon,
  RocketLaunchIcon,
} from '@phosphor-icons/react';

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
import type { CreateFavoriteBody, Favorite } from '@/types/favorite.types';
import { EditFavorite } from './edit-favorite';

const iconMap = {
  SITES: MagnifyingGlassIcon,
  ARTICLES: BookIcon,
  INSPIRATIONS: LightbulbIcon,
  TOOLS: WrenchIcon,
  TUTORIALS: VideoIcon,
};

export function FavoriteCard({
  favorite,
  onDelete,
  onEdit,
}: {
  favorite: Favorite;
  onDelete: (id: string) => void;
  onEdit: (id: string, favorite: CreateFavoriteBody) => void;
}) {
  const Icon = iconMap[favorite.type];

  return (
    <Card
      id={favorite.id}
      className="hover:shadow-foreground/20 transition-all duration-300 hover:scale-[1.02] animate-scale-in"
    >
      <CardHeader>
        <CardTitle
          className="line-clamp-2 pb-0.5 flex gap-2"
          title={favorite.title}
        >
          <Icon className="h-4 w-4 text-muted-foreground" />
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

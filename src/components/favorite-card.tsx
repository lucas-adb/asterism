import { PenIcon, RocketLaunchIcon, TrashIcon } from '@phosphor-icons/react';

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
import type { Favorite } from '@/types/favorite';

export function FavoriteCard({ favorite }: { favorite: Favorite }) {
  return (
    <Card
      id={favorite.id}
      className="hover:shadow-foreground/20 transition-all duration-300 hover:scale-[1.02] animate-scale-in"
    >
      <CardHeader>
        <CardTitle className="line-clamp-2" title={favorite.title}>
          {favorite.title}
        </CardTitle>
        <CardDescription
          className="line-clamp-3 cursor-help"
          title={favorite.description}
        >
          {favorite.description}
        </CardDescription>
        <CardAction className="flex gap-2">
          <Button
            size={'icon'}
            variant={'link'}
            className="h-4 w-4 cursor-pointer"
          >
            <PenIcon size={16} />
          </Button>
          <Button
            size={'icon'}
            variant={'ghost'}
            className="h-4 w-4 cursor-pointer"
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
                key={`${tag}-${index}`}
                className="px-3 py-1 rounded-full inline-flex text-sm bg-foreground text-background"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex justify-between w-full items-center">
          <p className="text-sm text-muted-foreground">
            {favorite.createdAt.toLocaleDateString()}
          </p>
          <Button className="cursor-pointer">
            <RocketLaunchIcon size={16} /> Visit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

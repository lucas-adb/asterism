import { FlyingSaucerIcon } from '@phosphor-icons/react';

export function NoFavoritesFound() {
  return (
    <div className="px-4 py-8 container mx-auto">
      <div className="text-center">
        <FlyingSaucerIcon size={32} className="mx-auto h-52 w-52" />
        <h3 className="font-semibold text-xl">No favorites found</h3>
      </div>
    </div>
  );
}

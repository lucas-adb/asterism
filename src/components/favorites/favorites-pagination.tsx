import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

export function FavoritesPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4 px-4 py-4 container mx-auto">
      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        <CaretDoubleLeftIcon />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <CaretLeftIcon />
      </Button>

      <div className="flex gap-0 justify-center items-center">
        <Button onClick={() => onPageChange(page)} variant={'link'}>
          {page}
        </Button>

        <p className="font-light text-sm">of</p>

        <p className="font-light text-sm px-4 py-2">{totalPages}</p>
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <CaretRightIcon />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="size-8"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        <CaretDoubleRightIcon />
      </Button>
    </div>
  );
}

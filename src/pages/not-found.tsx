import { Card } from '@/components/ui/card';
import etDisappointed from '@/assets/et-disappointed-big.svg';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500">
      <div className="px-4 py-8 container mx-auto lg:max-w-[1024px]">
        <Card className="flex flex-col h-[700px] border-none text-center p-4 gap-4 justify-center items-center">
          <img
            className="max-w-[450px] max-h-[450px] mx-auto"
            src={etDisappointed}
            alt=""
          />
          <h1 className="font-bold text-5xl md:text-6xl">404</h1>
          <p className="text-xl text-muted-foreground">
            Oops, we are lost. Page not Found.
          </p>
          <Button className=" mx-auto">
            <Link to={'/'}>Back To Home</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}

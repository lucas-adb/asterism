import type { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import et3D from '@/assets/et-3d.png';

import { NavLink } from 'react-router';

export function SignWrapper({
  title,
  text,
  path,
  children,
}: {
  title: string;
  text: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-l from-chart-1 to-chart-5">
      <div className="px-4 py-8 container mx-auto lg:max-w-[1024px]">
        <Card className="flex flex-row p-0 h-[700px] border-none">
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col gap-4 w-full max-w-[250px] sm:max-w-[350px] px-2 sm:px-0">
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl cursor-pointer mb-4">
                  <span className="animate-pulse">✨</span> Asterism
                </h1>
                <h2 className="font-bold text-2xl">{title}</h2>
                <p className="text-muted-foreground text-sm">
                  {text}{' '}
                  {
                    <NavLink
                      className="font-medium text-foreground hover:text-primary transition-all duration-300"
                      to={path}
                    >
                      Click here
                    </NavLink>
                  }
                </p>
              </div>
              {children}
            </div>
          </div>
          <div className="flex-1 max-w-[500px] overflow-hidden rounded-r-lg hidden lg:flex">
            <img
              src={et3D}
              alt="image of the mascot et flying through space"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

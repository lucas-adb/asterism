import { Header } from '@/components/layout/header';
import { Hero } from '@/components/layout/hero';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router';
import et3DWithStars from '@/assets/et-3d-with-stars.webp';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      <img
        src={et3DWithStars}
        alt="image of the mascot et flying through space"
        className="w-80 h-80 object-cover rounded-full mx-auto duration-300 hover:scale-[1.02] animate-scale-in will-change-auto transition-all hover:drop-shadow-[0_0_1.5rem_rgba(34,197,94,0.6)] hover:brightness-105"
      />
      <Hero />
      <div className="px-4 py-8 container mx-auto flex justify-center">
        {user?.username ? (
          <Button asChild>
            <Link to={'/favorites'}>See My Favorites</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to={'/login'}>Start your journey here 🚀</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

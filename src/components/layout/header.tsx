import { Button } from '../ui/button';
import { Link } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { UserInfoMenu } from './user-info-menu';
import { ModeToggle } from '../common/mode-toggle';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="px-4 py-8 container mx-auto flex justify-between items-center">
      <Link to={'/'}>
        <h1 className="font-bold text-2xl cursor-pointer">✨ Asterism</h1>
      </Link>
      <div className="flex gap-2 justify-center items-center">
        <ModeToggle />
        {user ? (
          <UserInfoMenu />
        ) : (
          <Button asChild>
            <Link to={'/login'}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

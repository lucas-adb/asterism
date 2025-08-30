import defaultProfilePic from '@/assets/et-head.svg';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { SignOutIcon } from '@phosphor-icons/react';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // todo: moves to its own component
  const UserInfo = () => (
    <div className="flex gap-2 items-center">
      <img
        className="w-10 h-10 rounded-full"
        src={defaultProfilePic}
        alt="default profile pic"
      />
      <p className="font-semibold hidden sm:block">{user?.username}</p>
      <Button
        size="icon"
        onClick={() => {
          logout();
          navigate('/');
        }}
        className="ml-2"
      >
        <SignOutIcon className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <header className="px-4 py-8 container mx-auto flex justify-between items-center">
      <Link to={'/'}>
        <h1 className="font-bold text-2xl cursor-pointer">✨ Asterism</h1>
      </Link>
      {user ? (
        <UserInfo />
      ) : (
        <Button asChild>
          <Link to={'/login'}>Login</Link>
        </Button>
      )}
    </header>
  );
}

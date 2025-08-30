import defaultProfilePic from '@/assets/et-head.svg';
import { Button } from '../ui/button';
import { Link } from 'react-router';

type HeaderProps = {
  user?: {
    name: string;
    img?: {
      src: string;
      alt: string;
    };
  };
};

type UserInfoProps = {
  user: {
    name: string;
    img?: {
      src: string;
      alt: string;
    };
  };
};

export function Header({ user }: HeaderProps) {
  // todo: moves to its own component
  const UserInfo = ({ user }: UserInfoProps) => (
    <div className="flex gap-2 items-center">
      <img
        className="w-10 h-10 rounded-full"
        src={user?.img ? user?.img.src : defaultProfilePic}
        alt={user?.img ? user?.img.alt : 'default profile pic'}
      />
      <p className="font-semibold hidden sm:block">{user?.name}</p>
    </div>
  );

  return (
    <header className="px-4 py-8 container mx-auto flex justify-between items-center">
      <h1 className="font-bold text-2xl cursor-pointer">✨ Asterism</h1>
      {user ? (
        <UserInfo user={user} />
      ) : (
        <Button asChild>
          <Link to={'/login'}>Login</Link>
        </Button>
      )}
    </header>
  );
}

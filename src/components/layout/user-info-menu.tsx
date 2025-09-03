import defaultProfilePic from '@/assets/et-head.svg';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function UserInfoMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <img
            className="w-10 h-10 rounded-full"
            src={defaultProfilePic}
            alt="default profile pic"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigate('/favorites');
            }}
          >
            My Favorites
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

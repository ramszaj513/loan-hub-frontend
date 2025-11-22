import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/hooks";

function ProfileMenu() {
  const { isAuthenticated, user, logout, showLoginModal } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="w-16 flex justify-end">
        <Button variant="ghost" onClick={showLoginModal}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="w-16 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.profile?.avatarUrl || "/avatars/01.png"}
                alt={user?.email || "User"}
              />
              <AvatarFallback>
                {user?.profile?.firstName && user?.profile?.lastName
                  ? `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase()
                  : user?.email?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.profile?.firstName && user?.profile?.lastName
                  ? `${user.profile.firstName} ${user.profile.lastName}`
                  : user?.email || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || ""}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => (window.location.href = "/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileMenu;

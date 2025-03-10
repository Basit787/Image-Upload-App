import { useIsMobile } from "@/hooks/use-mobile";
import { signOutApi } from "@/services/auth.api";
import { queryClient } from "@/services/client";
import { getUserDetails } from "@/services/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LogOut, User, type LucideIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Cookies from "js-cookie";
import { ImageUpload } from "./image/image-upload";

type ProfileOption = {
  text: string;
  icon: LucideIcon;
  onClick?: () => void;
  link?: string;
};

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["signOut"],
    mutationFn: () => signOutApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signOut"] });
      Cookies.remove("token");
      navigate("/auth", { replace: true });
    },
  });

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserDetails(),
  });

  const user = data?.result;

  const profileOptions: ProfileOption[][] = [
    [
      {
        text: "Profile Details",
        icon: User,
        onClick: () => navigate("/profile"),
      },
    ],
    [
      {
        text: "Logout",
        icon: LogOut,
        onClick: () => mutate(),
      },
    ],
  ];

  const UserAvatar = () => {
    return (
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={user?.image}
          alt={user?.name}
          className="rounded-full cursor-pointer"
        />
        <AvatarFallback className="text-lg font-bold">
          {user?.name.split("")[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  };

  const UserData = () => {
    return (
      <>
        <div className="flex flex-row items-center gap-4 p-2 relative">
          <UserAvatar />
          <h1 className="text-lg font-bold leading-none">{user.name}</h1>
        </div>
        <div>
          {profileOptions.map((profileOption, index) => (
            <div key={index + "div1"} className="flex flex-col">
              {profileOption.map((item, itemIndex) => {
                const DivItem = () => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-primary/25 hover:text-secondary text-primary/50 rounded-lg"
                    onClick={() => item.onClick && item.onClick()}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                );
                if (item.link) {
                  return (
                    <Link to={item.link} key={item.link}>
                      <DivItem />
                    </Link>
                  );
                }
                return <DivItem key={item.link} />;
              })}
              {index < profileOptions.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <Card className="fixed top-0 left-0 right-0 rounded-none shadow w-full flex items-center z-50 py-4">
      <nav className="container mx-auto flex flex-row justify-between w-full px-4">
        <div className="flex flex-col items-center">
          <span className="text-primary/55 font-semibold lg:text-4xl text-2xl">
            Image Gallery
          </span>
          <p className="text-primary/55 font-semibold">Add your images here</p>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <ImageUpload />

          {!isMobile ? (
            <HoverCard openDelay={0}>
              <HoverCardTrigger>
                <UserAvatar />
              </HoverCardTrigger>
              <HoverCardContent align="end" className="mt-[1.5rem]">
                <UserData />
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Sheet>
              <SheetTrigger>
                <UserAvatar />
              </SheetTrigger>
              <SheetContent className="bg-card">
                <UserData />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>
    </Card>
  );
};

export default Header;

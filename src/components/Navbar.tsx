import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MountainIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="flex flex-row items-center h-14 px-4 border-b border-gray-200 dark:border-gray-800">
      {session ? (
        <>
          <Link className="flex flex-row mr-4 font-bold" href="/home">
            <MountainIcon className="w-6 h-6" />
            Vaadiyan
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="link" asChild>
              <Link href="/home">Destinations</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/home/package">Packages</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/home/about">About us</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/home/contact">Contact</Link>
            </Button>
            {session.data.user.role === "ADMIN" ? (
              <Button variant="link" asChild>
                <Link href="/home/admin/location">Admin</Link>
              </Button>
            ) : null}
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {session.data.user.firstname[0] +
                      session.data.user.lastname[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button variant="ghost" asChild>
                    <Link href={`/home/profile/${session.data.user.username}`}>
                      Profile
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form
                    action={async () => {
                      "use server";
                      await logout();
                      redirect("/");
                    }}
                  >
                    <Button variant="ghost" type="submit">
                      Logout
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <>
          <Link className="flex flex-row mr-4 font-bold" href="/">
            <MountainIcon className="w-6 h-6" />
            Vaadiyan
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </>
      )}
    </nav>
  );
}

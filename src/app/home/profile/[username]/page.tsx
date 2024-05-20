import { getSession } from "@/lib/auth";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchProfile(username: string) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/users/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["profile"],
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch profile");
  }
}

export default async function Page(props: { params: { username: string } }) {
  const profile = await fetchProfile(props.params.username);
  const session = await getSession();
  let isOwner = false;
  if (session.data.user.username === props.params.username) {
    isOwner = true;
  }
  return (
    <div className="flex flex-col items-center justify-center pt-5 gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">
            Name - {profile.firstname + " " + profile.lastname}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Email - {profile.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Username - {profile.username}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button>
          <Link href={`/home/profile/${profile.username}/edit`}>
            Edit Profile
          </Link>
        </Button>
        <Button variant="secondary">Change Password</Button>
      </div>
    </div>
  );
}

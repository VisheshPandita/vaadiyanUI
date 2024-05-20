import ProfileEditForm from "@/components/ProfileEditForm";
import { getSession } from "@/lib/auth";

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

export default async function Component(props: {
  params: { username: string };
}) {
  const profile = await fetchProfile(props.params.username);
  return (
    <div className="mx-auto max-w-md space-y-6 mt-5">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          Edit Profile for {profile.username}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Update your profile information.
        </p>
      </div>
      <ProfileEditForm profile={profile} />
    </div>
  );
}

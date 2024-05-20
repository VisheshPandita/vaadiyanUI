import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { deleteLocationAction } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import Link from "next/link";

async function fetchLocations() {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/location`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["locations"],
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
    return await response.json();
  } catch (error) {
    console.log(error);
    console.error("Failed to fetch locations");
  }
}

export default async function Page() {
  const session = await getSession();
  const locations = await fetchLocations();
  return (
    <div className="m-5 flex flex-col gap-4">
      <div className="flex flex-row gap-3">
        <h1 className="text-3xl font-bold">Locations</h1>
        {session.data.user.role === "ADMIN" && (
          <Button variant={"default"}>
            <Link href={"/home/admin/location/add"}>Add Location</Link>
          </Button>
        )}
      </div>
      {locations &&
        locations.length > 0 &&
        locations.map((location: any) => (
          <Card key={location.id}>
            <CardContent>
              <div className="py-3">
                <p className="font-bold">
                  {location.name}, {location.country}
                </p>
                <p>{location.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant={"default"} asChild>
                  <Link href={`/home/admin/location/${location.name}/edit`}>
                    Edit Location
                  </Link>
                </Button>
                <form action={deleteLocationAction}>
                  <input type="hidden" name="locationId" value={location.id} />
                  <Button variant={"destructive"} type="submit">
                    Delete Location
                  </Button>
                </form>

                <Button variant={"secondary"} asChild>
                  <Link href={`/home/admin/location/${location.name}`}>
                    Itineraries
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteItineraryAction } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import Link from "next/link";

async function fetchItinerariesByLocation(location: string) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/itinerary/location/${location}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["itineraries"],
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

export default async function Page(props: {
  params: { locationName: string };
}) {
  const session = await getSession();
  const itineraries = await fetchItinerariesByLocation(
    props.params.locationName
  );
  return (
    <div className="m-5 flex flex-col gap-4">
      <div className="flex flex-row gap-3">
        <h1 className="text-3xl font-bold">
          Itineraries for {props.params.locationName}
        </h1>
        {session.data.user.role === "ADMIN" && (
          <Button variant={"default"} asChild>
            <Link
              href={`/home/admin/location/${props.params.locationName}/add`}
            >
              Add Itinerary
            </Link>
          </Button>
        )}
      </div>
      {itineraries &&
        itineraries.length > 0 &&
        itineraries.map((itinerary: any) => (
          <Card key={itinerary.id}>
            <CardContent>
              <div className="py-3">
                <p className="font-bold">
                  {itinerary.name}, {itinerary.location.name}
                </p>
                <p>{itinerary.description}</p>
              </div>
              <div className="flex gap-2">
                <form action={deleteItineraryAction}>
                  <input
                    type="hidden"
                    name="itineraryId"
                    value={itinerary.id}
                  />
                  <Button variant={"destructive"}>Delete Itinerary</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
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

export default async function Page(props: { params: { location: string } }) {
  const itineraries = await fetchItinerariesByLocation(props.params.location);
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {itineraries &&
          itineraries.length > 0 &&
          itineraries.map((itinerary: any) => (
            <Card key={itinerary.id}>
              <Link href={`/home/package/${itinerary.id}`}>
                <Image
                  alt="Italy Itinerary"
                  className="rounded-t-lg object-cover w-full h-48"
                  height="200"
                  src={itinerary.imageUrl}
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width="300"
                />
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{itinerary.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {itinerary.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {itinerary.itineraryDays.length} days
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPinIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {itinerary.location.name}, {itinerary.location.country}
                    </span>
                  </div>
                  <Button className="mt-4" variant="link">
                    View Itinerary
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
      </section>
    </main>
  );
}

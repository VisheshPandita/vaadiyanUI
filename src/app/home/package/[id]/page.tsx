import { Button } from "@/components/ui/button";
import { bookNowAction } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

async function getItineraryById(id: string) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/itinerary/${id}`,
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
    console.error("Failed to fetch itinerary");
  }
}

export default async function Page(props: { params: { id: string } }) {
  const itineraries = await getItineraryById(props.params.id);
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[500px] overflow-hidden">
        <Image
          alt="Travel Destination"
          className="absolute inset-0 w-full h-full object-cover"
          src={itineraries.imageUrl}
          height={500}
          width={1920}
        />
        <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl font-bold mb-4 sm:text-6xl">
              {itineraries.name}
            </h1>
            <p className="text-lg mb-8 sm:text-xl">{itineraries.description}</p>
          </div>
          <form action={bookNowAction}>
            <input name="itineraryId" value={props.params.id} type="hidden" />
            <Button variant={"secondary"}>Book Now</Button>
          </form>
        </div>
      </section>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-12">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-6">
          <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
          <nav>
            <ul className="space-y-2">
              {itineraries.itineraryDays.map((day: any) => (
                <li key={day.id}>
                  <Link
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                  >
                    {day.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          {itineraries.itineraryDays.map((day: any) => (
            <section className="mb-12" key={day.id}>
              <h2 className="text-3xl font-bold mb-4">{day.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {day.description}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

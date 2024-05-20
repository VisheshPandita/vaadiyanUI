import { getSession } from "@/lib/auth";
import Image from "next/image";
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
  const locations = await fetchLocations();

  return (
    <div className="w-full py-6">
      <div className="container grid max-[calc(2*25%)] gap-12 px-4 md:gap-14 xl:max-[calc(2*20%)] xl:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
            Explore the World
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Discover the best destinations and let our curated itineraries
            inspire your next adventure.
          </p>
        </div>
        {locations &&
          locations.length > 0 &&
          locations.map((location: any) => (
            <div className="grid gap-6 lg:grid-cols-2" key={location.id}>
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <Link
                    className="font-semibold"
                    href={`/home/${location.name}`}
                  >
                    <div className="grid gap-1.5 items-start text-base">
                      <h3 className="leading-none">
                        {location.name + ", " + location.country}
                      </h3>
                      <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                        {location.subHeading}
                      </p>
                    </div>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {location.description}
                  </p>
                </div>
                <Link
                  className="self-start mt-auto inline-flex items-center gap-2 text-sm font-medium underline"
                  href={`/home/${location.name}`}
                >
                  View Itinerary
                  <ArrowRightIcon className="inline-block h-4 w-4 translate-y-0.5" />
                </Link>
              </div>
              <div className="rounded-lg overflow-hidden aspect-[16/9] relative lg:order-last">
                <Image
                  alt="Bali, Indonesia"
                  className="absolute inset-0 object-cover object-center w-full"
                  height="197"
                  src={location.imageUrl}
                  style={{
                    aspectRatio: "350/197",
                    objectFit: "cover",
                  }}
                  width="350"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

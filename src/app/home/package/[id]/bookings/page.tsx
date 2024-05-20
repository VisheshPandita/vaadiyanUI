import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { getSession } from "@/lib/auth";
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
  const itinerary = await getItineraryById(props.params.id);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#6366F1] to-[#9333EA]">
          <div className="container px-4 md:px-6 text-center text-white">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Thank you for your booking!
              </h1>
              <p className="max-w-[600px] mx-auto text-gray-200 md:text-xl">
                {
                  "We're excited to help you explore your dream destination. Your itinerary details are below."
                }
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Your Itinerary
                  </h2>
                  <p className="text-gray-500 md:text-xl dark:text-gray-400">
                    Here are the details of your upcoming trip.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <MapPinIcon className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Destination</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {itinerary.location.name}, {itinerary.location.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <UsersIcon className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Travelers</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        2 adults, 1 child
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Trip Preparation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <LuggageIcon className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Packing Tips</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Check the weather and pack accordingly.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <ThermometerIcon className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Local Weather</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Expect highs of 75°F and lows of 60°F.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CarIcon className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Transportation</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        We recommend using the metro for getting around the
                        city.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Travel Booking. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CarIcon(props: any) {
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
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function LuggageIcon(props: any) {
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
      <path d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0" />
      <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
      <path d="M10 20h4" />
      <circle cx="16" cy="20" r="2" />
      <circle cx="8" cy="20" r="2" />
    </svg>
  );
}

function MapPinIcon(props: any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ThermometerIcon(props: any) {
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
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

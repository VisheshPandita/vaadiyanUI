import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex-1">
      <section className="w-full">
        <div className="grid gap-6 md:gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center md:space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-24 p-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl/none">
                Discover your next adventure
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The best destinations. Unforgettable experiences. Let us help
                you find the perfect trip.
              </p>
            </div>
            <Image
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/images/ireland.jpg"
              width="550"
            />
          </div>
          <div className="flex justify-center p-5 gap-x-5">
            <Button size="lg" variant={"outline"} asChild>
              <Link href={"/register"}>Register</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href={"/login"}>Log in</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-36 border-t border-b">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Popular Destinations
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The best destinations. Unforgettable experiences. Let us help you
              find the perfect trip.
            </p>
          </div>
          <div className="grid max-w-5xl mx-auto items-start sm:grid-cols-2 gap-6 lg:gap-12">
            <div className="flex flex-col gap-2">
              <Image
                alt="Thumbnail"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="400"
                src="/images/sydney.jpg"
                width="400"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">
                  Sydney, Australia{"  "}
                  <Badge className="text-xs" variant="outline">
                    5-day trip
                  </Badge>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sydney is known for its beautiful beaches, vibrant nightlife,
                  and iconic landmarks like the Sydney Opera House and Harbour
                  Bridge.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                alt="Thumbnail"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="400"
                src="/images/japan.jpg"
                width="400"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">
                  Tokyo, Japan{"  "}
                  <Badge className="text-xs" variant="outline">
                    7-day trip
                  </Badge>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Experience the blend of ancient tradition and modern
                  innovation in Tokyo. Visit historic temples, explore
                  futuristic neighborhoods, and savor delicious Japanese
                  cuisine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

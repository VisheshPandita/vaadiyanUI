import Image from "next/image";

export default function Component() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl">
                About Our Travel Company
              </h1>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                {
                  "Discover the world with us. Our team of passionate travelers is dedicated to creating unforgettable experiences for our customers. This project is started as a Assignment Project for Cloud Platform Programming course of NCI."
                }
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CompassIcon className="mr-4 h-6 w-6 flex-shrink-0 text-primary dark:text-primary-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Explore the Globe
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {
                      "From bustling cities to serene natural wonders, we'll take you on a journey to the most captivating destinations around the world."
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <PlaneIcon className="mr-4 h-6 w-6 flex-shrink-0 text-primary dark:text-primary-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Tailored Experiences
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {
                      "Our team of travel experts will work with you to create a personalized itinerary that caters to your unique preferences and interests."
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <AwardIcon className="mr-4 h-6 w-6 flex-shrink-0 text-primary dark:text-primary-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Exceptional Service
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {
                      "From the moment you book with us to the moment you return home, our dedicated team will ensure your journey is seamless and unforgettable."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              alt="About Us"
              className="h-full w-full rounded-lg object-cover"
              height={600}
              src="/images/vishesh_dp.jpg"
              style={{
                aspectRatio: "600/600",
                objectFit: "cover",
              }}
              width={600}
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-gray-900 to-transparent opacity-50" />
          </div>
        </div>
      </main>
    </div>
  );
}

function AwardIcon(props: any) {
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
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CompassIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function PlaneIcon(props: any) {
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
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

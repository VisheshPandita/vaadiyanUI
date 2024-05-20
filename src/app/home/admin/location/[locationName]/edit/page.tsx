import EditLocationForm from "@/components/EditLocationForm";
import { getSession } from "@/lib/auth";

async function getLocationByName(locationName: string) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.VAADIYAN_API_URL}/api/location/${locationName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["location"],
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
    console.error("Failed to fetch location");
  }
}

export default async function Page(props: {
  params: { locationName: string };
}) {
  const location = await getLocationByName(props.params.locationName);
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Edit Location</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Edit the location details.
          </p>
        </div>
        <EditLocationForm location={location} />
      </div>
    </div>
  );
}

import AddItineraryForm from "@/components/AddItineraryForm";

export default async function Page(props: {
  params: { locationName: string };
}) {
  return (
    <div className="m-10">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Add new Itinerary</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Add a new Itinerary to location {props.params.locationName}.
          </p>
        </div>
        <AddItineraryForm location={props.params.locationName} />
      </div>
    </div>
  );
}

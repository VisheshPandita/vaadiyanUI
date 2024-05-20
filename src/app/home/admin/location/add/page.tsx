import AddLocationForm from "@/components/AddLocationForm";

export default async function Page() {
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Add new location</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Add a new location to the system.
          </p>
        </div>
        <AddLocationForm />
      </div>
    </div>
  );
}

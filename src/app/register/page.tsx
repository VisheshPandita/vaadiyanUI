import RegistrationForm from "@/components/RegistrationForm";

export default async function Register() {
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to get registered at Vaadiyan.
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}

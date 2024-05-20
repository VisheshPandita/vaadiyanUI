import LoginForm from "@/components/LoginForm";

export default async function Page() {
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Log in</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back! Enter your credentials to log in.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

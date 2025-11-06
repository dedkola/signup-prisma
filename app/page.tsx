import Image from "next/image";
import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-16 px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Image
            className="dark:invert mx-auto mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />

          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Our Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Join thousands of users who trust us with their data
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by Next.js, Prisma, and PostgreSQL
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <SignupForm />

        {/* Footer */}
        <div className="mt-16 flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}

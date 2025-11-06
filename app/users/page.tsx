import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function UsersPage() {
  // Fetch all users from the database
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      id: "desc", // Most recent first (by ID since no createdAt field)
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Registered Users
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Total users: {users.length}
          </p>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No users registered yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.name || "Anonymous"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {user.email}
                      </p>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-3 py-1 rounded-full">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

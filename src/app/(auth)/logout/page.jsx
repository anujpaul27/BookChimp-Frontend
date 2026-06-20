"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function SignOutPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              // Redirect to your login or landing page once done
              router.push("/login"); 
            },
            onError: (ctx) => {
              setError(ctx.error.message || "An error occurred during sign out.");
            }
          },
        });
      } catch (err) {
        setError("Failed to sign out. Please try again.");
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="w-full max-w-sm text-center space-y-4">
        {!error ? (
          <>
            <h1 className="text-2xl font-bold tracking-tight">Signing you out...</h1>
            <p className="text-sm text-zinc-400">Clearing your secure session context.</p>
            {/* Simple Loading Spinner */}
            <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin mx-auto mt-4" />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-red-500">Sign Out Failed</h1>
            <p className="text-sm text-zinc-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-md text-sm hover:bg-zinc-700 transition"
            >
              Retry Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
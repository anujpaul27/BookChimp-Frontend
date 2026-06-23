"use client";

import React from "react";
import { ShieldX, ArrowLeft, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body py-12 px-8">
            {/* Icon */}
            <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-6">
              <ShieldX size={48} />
            </div>

            <h1 className="text-4xl font-bold text-base-content mb-2">
              Access Denied
            </h1>

            <p className="text-xl text-base-content/70 mb-8">
              You are not authorized to view this page.
            </p>


            <div className="flex flex-col sm:flex-row gap-4">
              {/* Go Back Button */}
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline flex-1 gap-2"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>

              {/* Go to Home Button */}
              <Link href="/" className="btn btn-primary flex-1 gap-2">
                <Home size={18} />
                Back to Home
              </Link>
            </div>

            {/* Login Button (if applicable) */}
            <Link href="/login" className="btn btn-secondary w-full mt-4 gap-2">
              <RefreshCw size={18} />
              Login with Another Account
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-base-content/50 mt-8">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}

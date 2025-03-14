"use client";

import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-6 bg-white dark:bg-gray-800 shadow-md">
        <SearchBar />
      </div>

      <main className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>
    </div>
  );
}

"use client";
import Link from "next/link";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top nav */}
        <nav className="bg-gradient-to-r from-black to-gray-800 shadow border-b-1 border-slate-500">
          <div className="max-w-7xl my-1 mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                {/* Hamburger for mobile */}

                <h1 className="text-xl font-semibold text-white">Sportvenue</h1>
              </div>

              <div className="flex items-center space-x-4 text-white">
                <Link
                  className="bg-white text-black hover:bg-black hover:text-white hover:border-1 hover:border-white font-bold py-2 px-4 rounded"
                  href={"/register"}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}

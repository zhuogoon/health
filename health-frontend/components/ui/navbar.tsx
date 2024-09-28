"use client";

export function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div>Health</div>
        <div>
          <a href="/login" className="text-white">
            Login
          </a>
        </div>
      </nav>
    </div>
  );
}

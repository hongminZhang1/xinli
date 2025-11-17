"use client";

import UserNav from './UserNav';

export default function Header() {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-end">
      <div className="container flex justify-between items-center">
        <div />
        <UserNav />
      </div>
    </header>
  );
}

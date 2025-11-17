import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-16 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          {/* Placeholder for logo or other left-aligned items */}
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}

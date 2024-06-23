import Link from "next/link";

export function Header({ isLoggedIn }:{isLoggedIn?:boolean}) {
  return (
    <header className="bg-neutral-50 border-b border-neutral-200 py-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-2 lg:mb-0">
          <h1 className="text-lg font-bold">Travelling with Alex</h1>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/" className="text-sm text-black hover:underline">Home</Link>
          <Link href="/about" className="text-sm text-black hover:underline">About</Link>
          <Link href="/posts" className="text-sm text-black hover:underline">Posts</Link>
          {isLoggedIn && (
            <Link href="/admin" className="text-sm text-black hover:underline">Admin</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

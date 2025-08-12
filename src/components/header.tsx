import etHead from '@/assets/et-head.svg';

export function Header() {
  return (
    <header className="px-4 py-8 container mx-auto flex justify-between items-center">
      <h1 className="font-bold text-2xl cursor-pointer">✨ Asterism</h1>
      <div className="flex gap-4 items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={etHead}
          alt="User avatar"
        />
        <p className="font-semibold hidden sm:block">John Doe</p>
      </div>
    </header>
  );
}

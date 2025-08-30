export function Hero() {
  return (
    <div>
      <main className="px-4 py-8 container mx-auto text-center">
        <div className="px-3 py-1 border mx-auto rounded-full inline-flex mb-4">
          <p className="text-sm font-medium">Version 1.0.b</p>
        </div>
        <h1 className="mx-auto text-5xl md:text-6xl animate-fade-in">
          Capture the{' '}
          <span className="relative inline-block group cursor-pointer">
            <span className="relative">stars</span>
            <span className="absolute top-3 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:-translate-y-1 text-sm">
              ✨
            </span>
            <span className="absolute -bottom-1  -right-4 opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out transform group-hover:scale-110 group-hover:translate-y-1 delay-200 text-3xl">
              ✨
            </span>
          </span>{' '}
          of the web.
          <br />
          Organize them into your own galaxy.
        </h1>
      </main>
    </div>
  );
}

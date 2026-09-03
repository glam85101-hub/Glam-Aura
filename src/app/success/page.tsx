export default function Success() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2eceab] via-white to-[#4ea893]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 text-center">
        ✅ Payment Successful!
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 text-center">
        Thanks for upgrading to <span className="font-semibold">PRO</span> 🎉
      </p>
      <a
        href="/"
        className="mt-10 px-6 py-3 sm:px-8 sm:py-4 bg-[#52d8bb] text-white font-semibold rounded-xl shadow hover:bg-[#48c0a6] transition-colors duration-300"
      >
        Back to Home
      </a>
    </main>
  );
}
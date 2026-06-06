export default function Cancel() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2eceab] via-white to-[#4ea893]">
      <h1 className="text-4xl font-bold text-slate-800">❌ Payment Canceled</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your payment was not completed. Please try again.
      </p>
      <a
        href="/"
        className="mt-10 px-6 py-3 bg-[#52d8bb] text-white font-semibold rounded-xl shadow hover:bg-[#48c0a6]"
      >
        Back to Home
      </a>
    </main>
  );
}
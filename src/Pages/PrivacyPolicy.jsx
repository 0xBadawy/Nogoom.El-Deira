import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white py-6 px-8 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Privacy Policy
        </h1>
        <nav>
          <a
            href="/"
            className="text-sm font-medium underline hover:text-pink-300 transition duration-200"
          >
            Back to Home
          </a>
        </nav>
      </div>
    </header>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto py-10 px-6 text-gray-800">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Your Privacy Zone
          </h2>
          <p className="leading-7">
            Your privacy is important to us. This page outlines how we handle
            your personal information with care, transparency, and respect.
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">What Data We Collect</h3>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Your name and email address when you sign up.</li>
            <li>Usage data like page visits and interactions.</li>
            <li>Optional profile data you choose to share.</li>
          </ul>
        </section>
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-2">How We Use Your Data</h3>
          <p className="leading-7">
            We use your data to improve our services, provide personalized
            experiences, and ensure the security of your account. We’ll never
            share your data without your consent.
          </p>
        </section>
        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Last updated: November 29, 2024. | Have questions?{" "}
            <a
              href="/contact"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Contact us
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

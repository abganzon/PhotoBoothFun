import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p>
            Welcome to PhotoBoothFun. We are committed to protecting your privacy and ensuring 
            the security of your personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
          <p>
            When you use PhotoBoothFun, we collect:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Photos you choose to upload</li>
            <li>Basic usage data to improve our service</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
          <p>
            We use your information solely for:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Providing our photo booth services</li>
            <li>Improving user experience</li>
            <li>Maintaining service security</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information
            and ensure it is not accessed, disclosed, altered or destroyed.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;

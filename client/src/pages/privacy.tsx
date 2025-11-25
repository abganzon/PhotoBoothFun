import { Layout } from "@/components/ui/layout";

export default function Privacy() {
  return (
    <Layout className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Features & Privacy Policy</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Features Column */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Features</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Photo Booth Experience
                </h3>
                <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                  <li>Take up to 4 photos in sequence</li>
                  <li>Automatic countdown timer (customizable 3-10 seconds)</li>
                  <li>Camera flip and mirror controls</li>
                  <li>Recapture individual photos</li>
                  <li>Mobile device support with touch controls</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Customization Options
                </h3>
                <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                  <li>Strip and collage (2x2) layouts</li>
                  <li>Custom strip name with text color selection</li>
                  <li>Adjustable timer duration</li>
                  <li>Background color picker</li>
                  <li>Date and name display options</li>
                  <li>Text color customization for name and date</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Sharing & Gallery
                </h3>
                <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                  <li>Download photo strips as PNG files</li>
                  <li>Save strips locally to gallery</li>
                  <li>Generate shareable links with QR codes</li>
                  <li>10-minute expiring share links</li>
                  <li>View shared strips without authentication</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  User Interface
                </h3>
                <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                  <li>Modern glassmorphic design</li>
                  <li>Dark/light mode support</li>
                  <li>Real-time camera preview</li>
                  <li>Responsive mobile and desktop layouts</li>
                  <li>Real-time visitor counter</li>
                  <li>Status notifications and toasts</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Authentication & Security
                </h3>
                <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                  <li>Secure authentication via Clerk</li>
                  <li>Protected routes for authenticated users</li>
                  <li>Session management</li>
                  <li>User profile and settings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Policy Column */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                Your privacy is my priority. This policy explains how your images and personal data are handled.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Image Processing
                </h3>
                <p className="text-gray-600 pl-5">All image processing happens locally within your browser on your device. No images are uploaded to external servers unless you explicitly choose to share them.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Data Collection
                </h3>
                <p className="text-gray-600 pl-5">I do not collect or store any images you process with this application. Your images stay entirely on your device in localStorage. Only when you choose to share do we temporarily store the photo strip on our server for the duration of the share link (10 minutes).</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Shared Links & Expiration
                </h3>
                <p className="text-gray-600 pl-5">Share links expire after 10 minutes for security and privacy. After expiration, the shared photo strip is no longer accessible. Shareable links are unique and cannot be guessed or discovered.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  User Authentication
                </h3>
                <p className="text-gray-600 pl-5">User authentication is handled by Clerk. We do not store passwords or sensitive authentication details. Your user ID is used only to associate your photo strips and share links with your account.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Analytics & Visitor Tracking
                </h3>
                <p className="text-gray-600 pl-5">We track a simple visitor counter displayed on the header for informational purposes only. This counter does not collect personal information or track individual users.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Policy Updates
                </h3>
                <p className="text-gray-600 pl-5">This privacy policy may be updated periodically to reflect new features and changes. Any significant changes will be communicated to users. Your continued use of the application indicates acceptance of the updated policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

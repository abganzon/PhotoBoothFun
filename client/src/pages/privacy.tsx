import { Layout } from "@/components/ui/layout";

export default function Privacy() {
  return (
    <Layout className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-6 text-center">Features & Privacy Policy</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Features Column */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-6">Features</h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full mr-3"></span>
                  Photo Booth Experience
                </h3>
                <ul className="text-slate-600 dark:text-slate-300 pl-5 list-disc ml-4 space-y-1.5 text-sm">
                  <li>Take up to 4 photos in sequence with auto-capture</li>
                  <li>Customizable countdown timer (1-10 seconds)</li>
                  <li>Camera flip and mirror controls</li>
                  <li>Recapture individual photos anytime</li>
                  <li>Mobile and desktop support with touch controls</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></span>
                  Customization Options
                </h3>
                <ul className="text-slate-600 dark:text-slate-300 pl-5 list-disc ml-4 space-y-1.5 text-sm">
                  <li>Strip (vertical) and Collage (2x2) layouts</li>
                  <li>Custom strip name with text color selection</li>
                  <li>Background color picker</li>
                  <li>Date and name display toggle</li>
                  <li>Text color customization for name and date</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  Sharing & Gallery
                </h3>
                <ul className="text-slate-600 dark:text-slate-300 pl-5 list-disc ml-4 space-y-1.5 text-sm">
                  <li>Download photo strips as high-quality PNG files</li>
                  <li>Save strips to local gallery</li>
                  <li>Generate shareable links with QR codes</li>
                  <li>10-minute expiring share links for privacy</li>
                  <li>View shared strips without authentication</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mr-3"></span>
                  User Interface
                </h3>
                <ul className="text-slate-600 dark:text-slate-300 pl-5 list-disc ml-4 space-y-1.5 text-sm">
                  <li>Modern glassmorphic design</li>
                  <li>Dark and light mode support</li>
                  <li>Real-time camera preview</li>
                  <li>Responsive mobile and desktop layouts</li>
                  <li>Real-time visitor counter</li>
                  <li>Status notifications and toasts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Policy Column */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-6">Privacy Policy</h2>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm mb-6 border border-slate-100 dark:border-slate-700">
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Your privacy is our priority. This policy explains how your images and personal data are handled.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full mr-3"></span>
                  Image Processing
                </h3>
                <p className="text-slate-600 dark:text-slate-300 pl-5 text-sm">
                  All image processing happens locally within your browser on your device. No images are uploaded to external servers unless you explicitly choose to share them.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></span>
                  Local Storage
                </h3>
                <p className="text-slate-600 dark:text-slate-300 pl-5 text-sm">
                  Your photo strips are stored in your browser's local storage. We do not collect or store any images on our servers. Your images stay entirely on your device.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  Shared Links & Expiration
                </h3>
                <p className="text-slate-600 dark:text-slate-300 pl-5 text-sm">
                  Share links expire after 10 minutes for security and privacy. After expiration, the shared photo strip is no longer accessible. Shareable links are unique and cannot be guessed.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3"></span>
                  User Authentication
                </h3>
                <p className="text-slate-600 dark:text-slate-300 pl-5 text-sm">
                  User authentication is handled securely by Clerk. We do not store passwords or sensitive authentication details. Your user ID is used only to associate your share links with your account.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-yellow-500 to-lime-500 rounded-full mr-3"></span>
                  Visitor Tracking
                </h3>
                <p className="text-slate-600 dark:text-slate-300 pl-5 text-sm">
                  We track a simple visitor counter displayed on the header for informational purposes only. This counter does not collect personal information or track individual users.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                  <span className="inline-block w-3 h-3 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mr-3"></span>
                  Policy Updates
                </h3>
                <p className="text-slate-600 dark:text-slate-300 pl-5 text-sm">
                  This privacy policy may be updated periodically to reflect new features and changes. Your continued use of the application indicates acceptance of the updated policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

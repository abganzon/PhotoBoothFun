
import { Layout } from "@/components/ui/layout";

export default function Privacy() {
  return (
    <Layout className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            Your privacy is my priority. This policy explains how your images and personal data are handled.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Image Processing
            </h2>
            <p className="text-gray-600 pl-5">All image processing happens locally within your browser on your device. No images are uploaded to external servers.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Data Collection
            </h2>
            <p className="text-gray-600 pl-5">I do not collect or store any images you process with this application. Your images stay entirely on your device.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              No Server Transmission
            </h2>
            <p className="text-gray-600 pl-5">All processing is done client-side, ensuring that your images are never transmitted to any servers.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Third-Party Services
            </h2>
            <p className="text-gray-600 pl-5">No third-party services are used that would require uploading or sharing your images.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Policy Updates
            </h2>
            <p className="text-gray-600 pl-5">This privacy policy may be updated periodically, with any changes posted on this page.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}


import { Layout } from "@/components/ui/layout";

export default function Privacy() {
  return (
    <Layout className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your privacy is my priority. This policy explains how your images and personal data are handled.
        </p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Image Processing</h2>
            <p className="text-gray-600">All image processing happens locally within your browser on your device. No images are uploaded to external servers.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Collection</h2>
            <p className="text-gray-600">I do not collect or store any images you process with this application. Your images stay entirely on your device.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">No Server Transmission</h2>
            <p className="text-gray-600">All processing is done client-side, ensuring that your images are never transmitted to any servers.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
            <p className="text-gray-600">No third-party services are used that would require uploading or sharing your images.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Policy Updates</h2>
            <p className="text-gray-600">This privacy policy may be updated periodically, with any changes posted on this page.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Digital photo booth with real-time camera access</li>
              <li>Local image processing and effects</li>
              <li>Download captured images directly to your device</li>
              <li>Browser-based operation - no installation required</li>
              <li>Privacy-focused design with no data collection</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

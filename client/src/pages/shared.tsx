import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Download, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SharedPhotoStrip {
  id: number;
  photos: string[];
  layout: "strip" | "collage";
  backgroundColor: string;
  stripName: string | null;
  showDate: boolean;
  showName: boolean;
  nameColor: string | null;
  dateColor: string | null;
  createdAt: string;
}

export default function SharedPage() {
  const { id } = useParams<{ id: string }>();
  const [photoStrip, setPhotoStrip] = useState<SharedPhotoStrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPhotoStrip = async () => {
      try {
        console.log("Fetching photo strip for ID:", id);
        const response = await fetch(`/api/shared-links/${id}`);

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);

          if (response.status === 404) {
            setError("Link not found or expired");
          } else {
            setError("Failed to load photo strip");
          }
          return;
        }

        const data = await response.json();
        console.log("Photo strip data:", data);

        // Validate the data structure
        if (!data || !data.photos || !Array.isArray(data.photos)) {
          console.error("Invalid photo strip data structure:", data);
          setError("Invalid photo strip data");
          return;
        }

        setPhotoStrip(data);
      } catch (error) {
        console.error("Error fetching photo strip:", error);
        setError("Failed to load photo strip");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoStrip();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  const handleDownload = () => {
    if (!photoStrip) return;

    const downloadPhotoStrip = async () => {
      try {
        const response = await fetch(`/api/download/${id}`);

        if (!response.ok) {
          console.error("Failed to download photo strip:", response.status, response.statusText);
          toast({
            variant: "destructive",
            title: "Failed to download photo strip",
            description: "Please try again later.",
          });
          return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${photoStrip.stripName || "photo-strip"}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        toast({
          title: "Photo strip downloaded",
          description: "Your photo strip has been downloaded successfully.",
        });

      } catch (error) {
        console.error("Error downloading photo strip:", error);
        toast({
          variant: "destructive",
          title: "Failed to download photo strip",
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    };
    downloadPhotoStrip();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading photo strip...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Expired</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            This link has expired or is no longer available. Links expire after 10 minutes for security.
          </p>
        </div>
      </div>
    );
  }

  if (!photoStrip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">Photo strip not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {photoStrip.stripName || "Shared Photo Strip"}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>This link will expire soon</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
              <PhotoStrip
                photos={photoStrip.photos as string[]}
                layout={photoStrip.layout}
                name={photoStrip.stripName}
                showDate={photoStrip.showDate}
                showName={photoStrip.showName}
                backgroundColor={photoStrip.backgroundColor}
                nameColor={photoStrip.nameColor || "#000000"}
                dateColor={photoStrip.dateColor || "#666666"}
                hideButtons={true}
              />

              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  <Download className="h-5 w-5" />
                  {isMobile ? "Save Photo" : "Download"}
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-4">
              Want to create your own photo strip? Visit our app!
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
            >
              Create Photo Strip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
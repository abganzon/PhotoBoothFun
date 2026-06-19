
import React, { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
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
  const [match, params] = useRoute("/shared/:id");
  const id = params?.id;
  const [photoStrip, setPhotoStrip] = useState<SharedPhotoStrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!match || !id) {
      setError("No photo strip ID provided");
      setLoading(false);
      return;
    }

    const fetchPhotoStrip = async () => {
      try {
        console.log("Fetching photo strip for ID:", id);
        const response = await fetch(`/api/shared-links/${id}`);
        
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers.get('content-type'));
        
        if (!response.ok) {
          let errorMessage;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || "Unknown error";
          } catch {
            errorMessage = await response.text();
          }
          
          console.error("API Error:", errorMessage);
          
          if (response.status === 404) {
            setError("Link not found or expired");
          } else {
            setError("Failed to load photo strip");
          }
          return;
        }

        const data = await response.json();
        console.log("Photo strip data received:", data);
        console.log("Photos array:", data.photos);
        console.log("Photos length:", data.photos?.length);
        
        // Validate the data structure
        if (!data) {
          console.error("No data received");
          setError("No data received from server");
          return;
        }

        if (!data.photos) {
          console.error("No photos in data");
          setError("No photos found in photo strip");
          return;
        }

        if (!Array.isArray(data.photos)) {
          console.error("Photos is not an array:", typeof data.photos, data.photos);
          setError("Invalid photo strip data format");
          return;
        }
        
        setPhotoStrip(data);
      } catch (error) {
        console.error("Network or parsing error:", error);
        setError("Failed to load photo strip - network error");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoStrip();
  }, [id]);

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
          <div className="max-w-lg mx-auto">
            <PhotoStrip
              photos={Array.isArray(photoStrip.photos) ? photoStrip.photos : []}
              layout={photoStrip.layout as "strip" | "collage"}
              name={photoStrip.stripName || undefined}
              showDate={photoStrip.showDate}
              showName={photoStrip.showName}
              backgroundColor={photoStrip.backgroundColor}
              nameColor={photoStrip.nameColor || "#000000"}
              dateColor={photoStrip.dateColor || "#666666"}
              hideButtons={false}
              darkMode={false}
              showShareButton={false}
            />
          </div>
          
          <div className="text-center mt-6 space-y-4">
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">
                Want to create your own photo strip?
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-2 border-blue-200 hover:bg-blue-50"
              >
                Create Your Own
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

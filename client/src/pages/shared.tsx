
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

  useEffect(() => {
    if (!id) {
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
            {console.log("Rendering PhotoStrip with:", {
              photos: photoStrip.photos,
              layout: photoStrip.layout,
              photosLength: photoStrip.photos?.length
            })}
            <PhotoStrip
              photos={Array.isArray(photoStrip.photos) ? photoStrip.photos : []}
              layout={photoStrip.layout as "strip" | "collage"}
              name={photoStrip.stripName || undefined}
              showDate={photoStrip.showDate}
              showName={photoStrip.showName}
              backgroundColor={photoStrip.backgroundColor}
              nameColor={photoStrip.nameColor || "#000000"}
              dateColor={photoStrip.dateColor || "#666666"}
              hideButtons={true}
              darkMode={false}
            />
          </div>
          
          <div className="text-center mt-6 space-y-4">
            <div className="flex justify-center">
              <Button
                onClick={async () => {
                  // Find the canvas in the PhotoStrip component
                  const canvas = document.querySelector('canvas');
                  if (!canvas) {
                    toast({
                      title: "Error",
                      description: "Could not find photo strip to download",
                      variant: "destructive",
                    });
                    return;
                  }

                  const fileName = `${photoStrip.stripName || 'photo-strip'}-shared.png`;
                  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

                  if (isMobile) {
                    try {
                      // Convert canvas to blob
                      const blob = await new Promise<Blob>((resolve) => {
                        canvas.toBlob((blob) => {
                          resolve(blob!);
                        }, 'image/png');
                      });

                      // Create a File object
                      const file = new File([blob], fileName, { type: 'image/png' });

                      // Check if the Web Share API is available
                      if (navigator.share && navigator.canShare({ files: [file] })) {
                        await navigator.share({
                          files: [file],
                          title: 'Photo Strip',
                          text: 'Download your photo strip'
                        });
                        
                        toast({
                          title: "Success!",
                          description: "Your photo strip is ready to be saved",
                          variant: "default",
                          duration: 3000,
                        });
                      } else {
                        // Fallback for browsers that don't support sharing files
                        const downloadUrl = canvas.toDataURL();
                        const link = document.createElement("a");
                        link.download = fileName;
                        link.href = downloadUrl;
                        link.click();
                        
                        toast({
                          title: "Photo Downloaded",
                          description: "Check your device's download folder",
                          variant: "default",
                          duration: 3000,
                        });
                      }
                    } catch (error) {
                      console.error('Error sharing/downloading:', error);
                      toast({
                        title: "Download Failed",
                        description: "There was an error downloading your photo",
                        variant: "destructive",
                        duration: 3000,
                      });
                    }
                  } else {
                    // Desktop download behavior
                    const link = document.createElement("a");
                    link.download = fileName;
                    link.href = canvas.toDataURL();
                    link.click();
                    
                    toast({
                      title: "Photo Downloaded",
                      description: "Check your downloads folder",
                      variant: "default",
                      duration: 3000,
                    });
                  }
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Photo Strip
              </Button>
            </div>
            
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

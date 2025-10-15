
import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";

interface SavedStrip {
  id: string;
  photos: string[];
  layout: "strip" | "collage";
  stripName: string;
  backgroundColor: string;
  nameColor: string;
  dateColor: string;
  showDate: boolean;
  showName: boolean;
  timestamp: number;
}

export default function Gallery() {
  const [savedStrips, setSavedStrips] = useState<SavedStrip[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("photoStrips");
    if (stored) {
      setSavedStrips(JSON.parse(stored));
    }
  }, []);

  const deleteStrip = (id: string) => {
    const updated = savedStrips.filter(strip => strip.id !== id);
    setSavedStrips(updated);
    localStorage.setItem("photoStrips", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">My Gallery</h1>
          </div>
          <Link href="/home">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Camera className="h-4 w-4 mr-2" />
              New Photo Booth
            </Button>
          </Link>
        </div>

        {savedStrips.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">No saved photo strips yet</p>
            <Link href="/home">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                Create Your First Photo Strip
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedStrips.map((strip) => (
              <div key={strip.id} className="bg-white rounded-xl shadow-lg p-4">
                <div className="relative">
                  <PhotoStrip
                    photos={strip.photos}
                    layout={strip.layout}
                    name={strip.stripName}
                    backgroundColor={strip.backgroundColor}
                    nameColor={strip.nameColor}
                    dateColor={strip.dateColor}
                    showDate={strip.showDate}
                    showName={strip.showName}
                    hideButtons={false}
                    darkMode={false}
                  />
                  <Button
                    onClick={() => deleteStrip(strip.id)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(strip.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

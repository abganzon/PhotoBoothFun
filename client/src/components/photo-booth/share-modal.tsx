
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Copy, Clock, QrCode, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoStripId: number;
  darkMode?: boolean;
  photos?: string[];
  layout?: "strip" | "collage";
  stripName?: string;
  backgroundColor?: string;
  nameColor?: string;
  dateColor?: string;
  showDate?: boolean;
  showName?: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  photoStripId,
  darkMode = false,
  photos = [],
  layout = "strip",
  stripName,
  backgroundColor = "#ffffff",
  nameColor = "#000000",
  dateColor = "#666666",
  showDate = true,
  showName = true
}) => {
  const [shareData, setShareData] = useState<{
    id: string;
    url: string;
    expiresAt: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/shared-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoStripId }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate share link");
      }

      const data = await response.json();
      const fullUrl = `${window.location.origin}${data.url}`;
      
      setShareData({
        id: data.id,
        url: fullUrl,
        expiresAt: data.expiresAt
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate share link",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const formatExpiryTime = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diffMinutes = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60));
    return `${diffMinutes} minutes`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">RoBooth</span>
            <span className="text-sm text-gray-500">- Share Photo Strip</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!shareData ? (
            <div className="text-center">
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Generate a temporary link to share your photo strip
              </p>
              <Button
                onClick={generateShareLink}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Share Link"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <QRCode
                  value={shareData.url}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 200 200`}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="share-link">Share Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="share-link"
                    value={shareData.url}
                    readOnly
                    className={`flex-1 ${darkMode ? 'bg-gray-700 border-gray-600' : ''}`}
                  />
                  <Button
                    onClick={() => copyToClipboard(shareData.url)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <Clock className="h-4 w-4" />
                <span>Expires in {formatExpiryTime(shareData.expiresAt)}</span>
              </div>
              
              <Button
                onClick={() => setShareData(null)}
                variant="outline"
                className="w-full"
              >
                Generate New Link
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

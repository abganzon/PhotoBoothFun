import { useState } from "react";
import { PhotoBoothCamera } from "@/components/photo-booth/camera";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [layout, setLayout] = useState<"strip" | "collage">("strip");
  const [nameColor, setNameColor] = useState("#000000");
  const [dateColor, setDateColor] = useState("#000000");
  const { toast } = useToast();

  const handleCapture = (photo: string) => {
    if (photos.length < 4) {
      setPhotos([...photos, photo]);
      if (photos.length === 3) {
        toast({
          title: "Photo strip complete!",
          description: "You can now download your photo strip.",
        });
      }
    }
  };

  const handleClearPhotos = () => {
    setPhotos([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Photo Booth</h1>
          <Button variant="outline" onClick={() => handleClearPhotos()}>
            Clear Photos
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Camera</h2>
              <p className="text-sm text-muted-foreground">
                Take up to 4 photos for your strip
              </p>
            </div>
            
            <PhotoBoothCamera
              onCapture={handleCapture}
              isCountingDown={isCountingDown}
            />

            <Separator />

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Layout</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={layout === "strip" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLayout("strip")}
                    >
                      Strip
                    </Button>
                    <Button
                      variant={layout === "collage" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLayout("collage")}
                    >
                      Collage
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label>Show Name</Label>
                  <Switch
                    checked={showName}
                    onCheckedChange={setShowName}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Date</Label>
                  <Switch
                    checked={showDate}
                    onCheckedChange={setShowDate}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name Color</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        style={{ backgroundColor: nameColor }}
                      >
                        {nameColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3">
                      <HexColorPicker color={nameColor} onChange={setNameColor} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Date Color</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        style={{ backgroundColor: dateColor }}
                      >
                        {dateColor}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3">
                      <HexColorPicker color={dateColor} onChange={setDateColor} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Preview</h2>
              <p className="text-sm text-muted-foreground">
                Your photo strip will appear here
              </p>
            </div>
            
            <PhotoStrip
              photos={photos}
              name={showName ? name : ""}
              showDate={showDate}
              layout={layout}
              nameColor={nameColor}
              dateColor={dateColor}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
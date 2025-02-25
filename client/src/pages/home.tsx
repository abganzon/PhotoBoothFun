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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <PhotoBoothCamera
              onCapture={handleCapture}
              isCountingDown={isCountingDown}
            />
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-48"
                  placeholder="Enter name"
                />
              </div>
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
              <div className="flex items-center justify-between">
                <Label>Layout</Label>
                <div className="flex gap-2">
                  <Button
                    variant={layout === "strip" ? "default" : "outline"}
                    onClick={() => setLayout("strip")}
                    size="sm"
                  >
                    Strip
                  </Button>
                  <Button
                    variant={layout === "collage" ? "default" : "outline"}
                    onClick={() => setLayout("collage")}
                    size="sm"
                  >
                    Collage
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Name Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[4rem] h-[2rem]"
                      style={{ backgroundColor: nameColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <HexColorPicker color={nameColor} onChange={setNameColor} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center justify-between">
                <Label>Date Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[4rem] h-[2rem]"
                      style={{ backgroundColor: dateColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <HexColorPicker color={dateColor} onChange={setDateColor} />
                  </PopoverContent>
                </Popover>
              </div>
              {photos.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={handleClearPhotos}
                  className="w-full"
                >
                  Clear Photos
                </Button>
              )}
            </div>
          </div>
          <div>
            <PhotoStrip
              photos={photos}
              name={name}
              showName={showName}
              showDate={showDate}
              layout={layout}
              nameColor={nameColor}
              dateColor={dateColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
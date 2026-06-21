export async function downloadBlobAsPng(
  blob: Blob,
  fileName: string
): Promise<"downloaded" | "opened"> {
  const url = URL.createObjectURL(blob);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  try {
    if (isIOS) {
      const tab = window.open(url, "_blank");
      if (!tab) {
        window.location.assign(url);
      }
      return "opened";
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return "downloaded";
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }
}

export async function downloadCanvasAsPng(
  canvas: HTMLCanvasElement,
  fileName: string
): Promise<"downloaded" | "opened"> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((value) => resolve(value), "image/png");
  });

  if (!blob) {
    throw new Error("Failed to create image");
  }

  return downloadBlobAsPng(blob, fileName);
}

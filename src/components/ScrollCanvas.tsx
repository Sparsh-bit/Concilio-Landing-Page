import { useCallback, useEffect, useRef } from "react";

interface ScrollCanvasProps {
  scrollProgress: number;
  frameCount: number;
  frameFolder: string;
  framePrefix?: string;
  frameOverride?: number;
  onLoadProgress?: (progress: number) => void;
  watermarkCropPercent?: number;
}

const ScrollCanvas: React.FC<ScrollCanvasProps> = ({
  scrollProgress,
  frameCount,
  frameFolder,
  framePrefix = "ezgif-frame-",
  frameOverride,
  onLoadProgress,
  watermarkCropPercent = 0
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);

  const getFramePath = useCallback((index: number): string => {
    const frame = String(index + 1).padStart(3, "0");
    // Ensure folder ends with / if not provided
    const folder = frameFolder.endsWith('/') ? frameFolder : `${frameFolder}/`;
    return `${folder}${framePrefix}${frame}.jpg`;
  }, [frameFolder, framePrefix]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const image = imagesRef.current[frameIndex];
    if (!image || !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    // Use simple 1.0 pixel ratio for performance, or window.devicePixelRatio for quality
    // Given the previous code used 1920x1080 fixed, let's stick to dynamic sizing
    const dpr = window.devicePixelRatio || 1;

    // Correctly scale canvas for High DPI displays
    const targetWidth = Math.floor(displayWidth * dpr);
    const targetHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Optimization: turn off alpha if possible, but we might need it for cropping/clearing
    // context.globalCompositeOperation = 'copy'; // Faster if we cover the whole canvas

    // We clear rect only if we are not covering the whole canvas, but cover logic usually does.
    context.clearRect(0, 0, canvas.width, canvas.height);

    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;
    const cropHeight = Math.floor(sourceHeight * watermarkCropPercent);
    const sourceCropHeight = sourceHeight - cropHeight;

    const imageAspect = sourceWidth / sourceCropHeight;
    const viewportAspect = displayWidth / displayHeight;

    let drawWidth, drawHeight, drawX, drawY;

    // "Cover" logic
    if (imageAspect > viewportAspect) {
      drawHeight = targetHeight;
      drawWidth = targetHeight * imageAspect;
      drawX = (targetWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = targetWidth;
      drawHeight = targetWidth / imageAspect;
      drawX = 0;
      drawY = (targetHeight - drawHeight) / 2;
    }

    context.drawImage(
      image,
      0,
      0,
      sourceWidth,
      sourceCropHeight,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );
  }, [watermarkCropPercent]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Cancel any previous loads if props change
    let isActive = true;

    for (let index = 0; index < frameCount; index++) {
      const image = new Image();
      image.decoding = "async"; // Hint to browser
      image.src = getFramePath(index);
      image.onload = () => {
        if (!isActive) return;
        loadedCount++;
        if (onLoadProgress) {
          onLoadProgress(loadedCount / frameCount);
        }
        if (index === currentFrameRef.current) drawFrame(index);
      };
      image.onerror = () => {
        if (!isActive) return;
        loadedCount++;
        if (onLoadProgress) {
          onLoadProgress(loadedCount / frameCount);
        }
      };
      images.push(image);
    }

    imagesRef.current = images;

    return () => {
      isActive = false;
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, getFramePath, onLoadProgress, frameCount]);

  useEffect(() => {
    const targetFrame =
      typeof frameOverride === "number"
        ? Math.max(0, Math.min(frameCount - 1, frameOverride))
        : Math.max(0, Math.min(frameCount - 1, Math.round(scrollProgress * (frameCount - 1))));

    if (targetFrame === currentFrameRef.current && typeof frameOverride === 'undefined') return;
    currentFrameRef.current = targetFrame;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(targetFrame);
      rafRef.current = null;
    });
  }, [drawFrame, frameOverride, scrollProgress, frameCount]);

  useEffect(() => {
    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(currentFrameRef.current));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return <canvas ref={canvasRef} className="w-full h-full object-cover" />;
};

export default ScrollCanvas;

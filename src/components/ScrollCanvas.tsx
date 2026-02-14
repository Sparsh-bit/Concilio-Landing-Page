import { useCallback, useEffect, useRef } from "react";
import { FRAME_FOLDER, FRAME_PREFIX, TOTAL_FRAMES, WATERMARK_CROP_PERCENT } from "../data/scrollData";

interface ScrollCanvasProps {
  scrollProgress: number;
  frameOverride?: number;
  onLoadProgress?: (progress: number) => void;
}

const ScrollCanvas: React.FC<ScrollCanvasProps> = ({ scrollProgress, frameOverride, onLoadProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);

  const getFramePath = useCallback((index: number): string => {
    const frame = String(index + 1).padStart(3, "0");
    return `${FRAME_FOLDER}${FRAME_PREFIX}${frame}.jpg`;
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const image = imagesRef.current[frameIndex];
    if (!image || !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    // Correctly scale canvas for High DPI displays
    const targetWidth = Math.floor(displayWidth * dpr);
    const targetHeight = Math.floor(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;
    const cropHeight = Math.floor(sourceHeight * WATERMARK_CROP_PERCENT);
    const sourceCropHeight = sourceHeight - cropHeight;

    const imageAspect = sourceWidth / sourceCropHeight;
    const viewportAspect = displayWidth / displayHeight;

    let drawWidth, drawHeight, drawX, drawY;

    // "Cover" logic: ensure the image covers the entire canvas
    if (imageAspect > viewportAspect) {
      // Image is wider than viewport
      drawHeight = targetHeight;
      drawWidth = targetHeight * imageAspect;
      drawX = (targetWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      // Image is taller than viewport
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
  }, []);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let index = 0; index < TOTAL_FRAMES; index++) {
      const image = new Image();
      image.decoding = "async";
      image.src = getFramePath(index);
      image.onload = () => {
        loadedCount++;
        if (onLoadProgress) {
          onLoadProgress(loadedCount / TOTAL_FRAMES);
        }
        if (index === currentFrameRef.current) drawFrame(index);
      };
      image.onerror = () => {
        loadedCount++; // Count as "finished" even if error to avoid blocking the loader forever
        if (onLoadProgress) {
          onLoadProgress(loadedCount / TOTAL_FRAMES);
        }
      };
      images.push(image);
    }

    imagesRef.current = images;

    return () => {
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, getFramePath, onLoadProgress]);

  useEffect(() => {
    const targetFrame =
      typeof frameOverride === "number"
        ? Math.max(0, Math.min(TOTAL_FRAMES - 1, frameOverride))
        : Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(scrollProgress * (TOTAL_FRAMES - 1))));

    if (targetFrame === currentFrameRef.current && !frameOverride) return;
    currentFrameRef.current = targetFrame;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(targetFrame);
      rafRef.current = null;
    });
  }, [drawFrame, frameOverride, scrollProgress]);

  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return <canvas ref={canvasRef} className="scroll-canvas" aria-hidden="true" />;
};

export default ScrollCanvas;

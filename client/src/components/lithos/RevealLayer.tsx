import React, { useRef, useEffect } from 'react';

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
  radius?: number;
}

export const RevealLayer: React.FC<RevealLayerProps> = ({
  image,
  cursorX,
  cursorY,
  radius = 260,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // Resize canvas to match window on mount and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Redraw canvas mask every time cursor position changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const revealDiv = revealRef.current;
    if (!canvas || !revealDiv) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Only draw when cursor is on screen
    if (cursorX < 0 || cursorY < 0) {
      revealDiv.style.webkitMaskImage = 'none';
      revealDiv.style.maskImage = 'none';
      return;
    }

    // Build soft radial gradient spotlight
    const grad = ctx.createRadialGradient(
      cursorX, cursorY, 0,
      cursorX, cursorY, radius,
    );
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.4,  'rgba(255,255,255,1)');
    grad.addColorStop(0.6,  'rgba(255,255,255,0.75)');
    grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1,    'rgba(255,255,255,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Convert canvas to data URL and apply as CSS mask
    const dataURL = canvas.toDataURL();
    revealDiv.style.webkitMaskImage = `url(${dataURL})`;
    revealDiv.style.maskImage       = `url(${dataURL})`;
    revealDiv.style.webkitMaskSize  = '100% 100%';
    revealDiv.style.maskSize        = '100% 100%';
  }, [cursorX, cursorY, radius]);

  return (
    <>
      {/* Hidden offscreen canvas used only to generate the mask data URL */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ display: 'none' }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Reveal image layer — masked by the canvas-generated radial gradient */}
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
    </>
  );
};

import { CanvasKit } from 'canvaskit-wasm';

export function preventScrolling(canvas: HTMLElement) {
  canvas.addEventListener('touchmove', (e) => {
    // Prevents touch events in the canvas from scrolling the canvas.
    e.preventDefault();
    e.stopPropagation();
  });
}

// Helper function to create an optional WebGPU canvas surface, if WebGPU is supported. Falls back
// to CanvasKit.MakeCanvasSurface for SW/WebGL otherwise.
export function MakeCanvasSurface(CanvasKit: CanvasKit, gpu: any, canvasId: string) {
  if (gpu) {
    const canvasContext = CanvasKit.MakeGPUCanvasContext(
      gpu, document.getElementById(canvasId) as HTMLCanvasElement);
    if (!canvasContext) {
      console.error('Failed to configure WebGPU canvas context');
      return;
    }
    const surface = CanvasKit.MakeGPUCanvasSurface(canvasContext, CanvasKit.ColorSpace.SRGB);
    if (!surface) {
      console.error('Failed to initialize current swapchain Surface');
    }
    return surface;
  }
  return CanvasKit.MakeWebGLCanvasSurface(canvasId);
}
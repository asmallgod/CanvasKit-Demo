import { CanvasKit, WebGPUDeviceContext } from 'canvaskit-wasm';
import { MakeCanvasSurface } from './utils';

export function DrawGlyphsAPI1(CanvasKit: CanvasKit, gpu: WebGPUDeviceContext) {
  const surface = MakeCanvasSurface(CanvasKit, gpu, 'drawGlyphs');
  if (!surface) {
    console.error('Could not make surface');
    return;
  }
  const canvas = surface.getCanvas();
  const paint = new CanvasKit.Paint();
  const font = new CanvasKit.Font(null, 16);
  paint.setAntiAlias(true);

  const glyphs = [];
  const positions = [];
  for (let i = 0; i < 256; ++i) {
    glyphs.push(i);
    positions.push((i % 16) * 16);
    positions.push(Math.round(i / 16) * 16);
  }
  canvas.drawGlyphs(glyphs, positions, 16, 20, font, paint);

  surface.flush();

  surface.delete();
  paint.delete();
  font.delete();
}
import { CanvasKit, WebGPUDeviceContext } from 'canvaskit-wasm';
import { MakeCanvasSurface } from './utils';

export function GradientAPI1(CanvasKit: CanvasKit, gpu: WebGPUDeviceContext) {
  const surface = MakeCanvasSurface(CanvasKit, gpu, 'gradient1');
  if (!surface) {
    console.error('Could not make surface');
    return;
  }
  const canvas = surface.getCanvas();
  const paint = new CanvasKit.Paint();

  // See https://fiddle.skia.org/c/f48b22eaad1bb7adcc3faaa321754af6
  // for original c++ version.
  const colors = [CanvasKit.BLUE, CanvasKit.YELLOW, CanvasKit.RED];
  const pos = [0, .7, 1.0];
  const transform = [2, 0, 0,
    0, 2, 0,
    0, 0, 1];
  const shader = CanvasKit.Shader.MakeRadialGradient([150, 150], 130, colors,
    pos, CanvasKit.TileMode.Mirror, transform);

  paint.setShader(shader);
  const textFont = new CanvasKit.Font(null, 75);
  const textBlob = CanvasKit.TextBlob.MakeFromText('Radial', textFont);

  canvas.drawTextBlob(textBlob, 10, 200, paint);
  surface.flush();
  paint.delete();
  textFont.delete();
  textBlob.delete();
  shader.delete();
  surface.delete();
}
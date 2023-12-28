import { CanvasKit, WebGPUDeviceContext } from 'canvaskit-wasm';
import { MakeCanvasSurface } from './utils';

export function VertexAPI1(CanvasKit: CanvasKit, gpu: WebGPUDeviceContext) {
  const surface = MakeCanvasSurface(CanvasKit, gpu, 'vertex1');
  if (!surface) {
    console.error('Could not make surface');
    return;
  }
  const canvas = surface.getCanvas();
  const paint = new CanvasKit.Paint();

  // See https://fiddle.skia.org/c/f48b22eaad1bb7adcc3faaa321754af6
  // for original c++ version.
  let points = [0, 0, 250, 0, 100, 100, 0, 250];
  const colors = [CanvasKit.RED, CanvasKit.BLUE,
  CanvasKit.YELLOW, CanvasKit.CYAN];
  let vertices = CanvasKit.MakeVertices(CanvasKit.VertexMode.TriangleFan,
    points, null, colors as any, undefined,
    false /*isVolatile*/);

  canvas.drawVertices(vertices, CanvasKit.BlendMode.Dst, paint);

  vertices.delete();

  // See https://fiddle.skia.org/c/e8bdae9bea3227758989028424fcac3d
  // for original c++ version.
  points = [300, 300, 50, 300, 200, 200, 300, 50];
  const texs = [0, 0, 0, 250, 250, 250, 250, 0];
  vertices = CanvasKit.MakeVertices(CanvasKit.VertexMode.TriangleFan,
    points, texs, colors as any);

  const shader = CanvasKit.Shader.MakeLinearGradient([0, 0], [250, 0],
    colors, null, CanvasKit.TileMode.Clamp);
  paint.setShader(shader);

  canvas.drawVertices(vertices, CanvasKit.BlendMode.Darken, paint);
  surface.flush();

  shader.delete();
  paint.delete();
  surface.delete();
  vertices.delete();
}
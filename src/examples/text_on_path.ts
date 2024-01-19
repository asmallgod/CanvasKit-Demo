import { CanvasKit, WebGPUDeviceContext } from 'canvaskit-wasm';
import { MakeCanvasSurface } from './utils';

export function TextOnPathAPI1(CanvasKit: CanvasKit, gpu: WebGPUDeviceContext) {
  const surface = MakeCanvasSurface(CanvasKit, gpu, 'textonpath');
  if (!surface) {
    console.error('Could not make surface');
    return;
  }
  const canvas = surface.getCanvas();
  const paint = new CanvasKit.Paint();
  paint.setStyle(CanvasKit.PaintStyle.Stroke);
  paint.setAntiAlias(true);

  const font = new CanvasKit.Font(null, 24);
  const fontPaint = new CanvasKit.Paint();
  fontPaint.setStyle(CanvasKit.PaintStyle.Fill);
  fontPaint.setAntiAlias(true);

  const arc = new CanvasKit.Path();
  arc.arcToOval(CanvasKit.LTRBRect(20, 40, 280, 300), -160, 140, true);
  arc.lineTo(210, 140);
  arc.arcToOval(CanvasKit.LTRBRect(20, 0, 280, 260), 160, -140, true);

  const str = 'This téxt should follow the curve across contours...';
  const textBlob = CanvasKit.TextBlob.MakeOnPath(str, arc, font);

  canvas.drawPath(arc, paint);
  canvas.drawTextBlob(textBlob, 0, 0, fontPaint);

  surface.flush();

  surface.delete();
  textBlob.delete();
  arc.delete();
  paint.delete();
  font.delete();
  fontPaint.delete();
}